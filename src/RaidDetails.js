import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { authToken } from './API'
import _ from 'lodash'
import FlexContainer from './FlexContainer'
import { validateEnchantments, validateGems } from './Validations'
import { getClassColor } from './ClassDetails'
import FailColumns from './FailColumns'
import BuffColumns from './BuffColumns'
import CastColumns from './CastColumns'

const RaidDetails = () => {

    //holds the id param from the URL
    //used to identify the user that we are editing
    const {id} = useParams()

    const [players, setPlayers] = useState(null)

    const [totalCombatTime, setTotalCombatTime] = useState(0)

    const [title, setTitle] = useState(null)

    const [isLoading, setIsLoading] = useState(true)

    var unValidatedPlayers = []

    const buffsColumns = [
      {id:33256, name:"Well Fed",          uses:true,  uptime:true},
      {id:33082, name:"Strength V",        uses:true,  uptime:true},
      {id:28520, name:"Relentless Assult", uses:false, uptime:true}
    ]
    //28521 28518 28540 28520 flask
    //33261 43771 33257 33263 33254 33268 43764 33256 well fed

    const castsColumns = [
      {id:28507, name:"Haste Potion",      uses:true},
      {id:35476, name:"Drums of Battle",   uses:true}
    ]

    const getRaidInfo = () =>{

        setIsLoading(true)

        axios.request({
          url: "api/v2/client",
          method: "post",
          baseURL: "https://classic.warcraftlogs.com/",
          headers: {
            "Authorization": `Bearer ${authToken}`
          },
          data:{
            query:`{
              reportData {
                report(code:"${id}"){
                  title
                  fights{
                    startTime
                    endTime
                    encounterID
                    name
                  }
                  table(startTime:0, endTime:15000000)
                }
              }
            }`
          }
        }).then(function(res) {
            if(res.data.data){
              var fights = res.data.data.reportData.report.fights
              var dps = res.data.data.reportData.report.table.data.playerDetails.dps
              var healers = res.data.data.reportData.report.table.data.playerDetails.healers
              var tanks = res.data.data.reportData.report.table.data.playerDetails.tanks
              
              var tempTotalCombatTime = 0

              fights.forEach((fight)=>{
                if(fight.encounterID > 0){
                  tempTotalCombatTime = tempTotalCombatTime + (fight.endTime - fight.startTime)
                }
              })

              setTotalCombatTime(tempTotalCombatTime)

              tanks.forEach((tank)=>{

                dps.forEach((player, i)=>{
                  if(player.type === "Unknown"){
                    dps.splice(i,1)
                  }
                  else{
                    if(tank.name === player.name){
                      tank.combatantInfo.gear = _.union(tank.combatantInfo.gear, player.combatantInfo.gear)
                      dps.splice(i, 1)
                    }
                  }
                })

                healers.forEach((healer, i)=>{
                  if(tank.name === healer.name){
                    tank.combatantInfo.gear = _.union(tank.combatantInfo.gear, healer.combatantInfo.gear)
                    healer.splice(i, 1)
                  }
                })
              })

              healers.forEach((healer)=>{

                dps.forEach((player, i)=>{
                  if(healer.name === player.name){
                    healer.combatantInfo.gear = _.union(healer.combatantInfo.gear, player.combatantInfo.gear)
                    dps.splice(i, 1)
                  }
                })
              })

              unValidatedPlayers = _.union(dps, healers, tanks)
              unValidatedPlayers.forEach((player, index, object)=>{
                if(player.combatantInfo.gear){
                  player.failedEnchants = validateEnchantments(player.combatantInfo.gear, player.specs[0])
                  player.failedGems = validateGems(player.combatantInfo.gear)
                }
                else{
                  object.splice(index, 1)
                }
              })
              setPlayers(_.cloneDeep(unValidatedPlayers))
              setTitle(res.data.data.reportData.report.title)
            }
        }).then(()=>{

          var queryString = ''
          unValidatedPlayers.forEach(player=>{
            queryString = queryString + `${player.name}Buffs : table(sourceID:${player.id}, dataType:Buffs, startTime:0, endTime:15000000)\n`
            queryString = queryString + `${player.name}Casts : table(sourceID:${player.id}, dataType:Casts, startTime:0, endTime:15000000)\n`
          })

          axios.request({
            url: "api/v2/client",
            method: "post",
            baseURL: "https://classic.warcraftlogs.com/",
            headers: {
              "Authorization": `Bearer ${authToken}`
            },
            data:{
              query:`{
                reportData {
                  report(code:"${id}"){
                    ${queryString}
                  }
                }
              }`
            }
          }).then((res)=>{
            unValidatedPlayers.forEach((player)=>{
              player.buffs = res.data.data.reportData.report[`${player.name}Buffs`].data.auras
              player.casts = res.data.data.reportData.report[`${player.name}Casts`].data.entries
            })
            setPlayers(_.cloneDeep(unValidatedPlayers))
          }).then(()=>{
            setIsLoading(false)
          })
        })
      }

    useEffect(() => {
      if(!players){
        getRaidInfo()
      }
    }, [])

    return ( isLoading ? <div>Loading</div> :
        <FlexContainer>
            <h1>{title}</h1>
            <div>
              <div style={{display:'flex', position:'sticky'}}>
                <div style={{width:125, fontWeight:500}}>Player Name</div>
                {castsColumns.map((cast)=>{
                  return(
                    <div style={{width:125, fontWeight:500}}>
                      <div>{cast.name}</div>
                      <div>{cast.uses?<span>Uses</span>:null}{cast.uses && cast.uptime ? <span> - </span>:null}{cast.uptime ? <span>Up Time</span>:null}</div>
                    </div>
                  )
                })}
                {buffsColumns.map((buff)=>{
                  return(
                    <div style={{width:125, fontWeight:500}}>
                      <div>{buff.name}</div>
                      <div>{buff.uses?<span>Uses</span>:null}{buff.uses && buff.uptime ? <span> - </span>:null}{buff.uptime ? <span>Up Time</span>:null}</div>
                    </div>
                  )
                })}
                <div style={{width:300, fontWeight:500}}>Enchant Fails</div>
                <div style={{width:300, fontWeight:500}}>Gem Fails</div>
              </div>
                {players.map((player, i)=>{
                  return (<div key={player.name} style={{display:'flex', backgroundColor: i%2 === 0 ? "#DDDDDDDD" : null}}>
                            <div style={{width:125, backgroundColor:getClassColor(player.type), fontWeight:500, fontSize:18}}>{player.name}</div>
                            <CastColumns player={player} castsColumns={castsColumns}/>
                            <BuffColumns player={player} buffsColumns={buffsColumns} totalCombatTime={totalCombatTime}/>
                            <FailColumns player={player} i={i}/>
                          </div>)
                })}
            </div>
        </FlexContainer>
    )
}

export default RaidDetails
