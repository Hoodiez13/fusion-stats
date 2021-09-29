import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { authToken } from './API'
import _ from 'lodash'
import FlexContainer from './FlexContainer'
import { Chip, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material'
import { validateEnchantments, validateGems } from './Validations'
import { ExpandMore } from '@mui/icons-material'
import { getUsage } from './ConsumeUsage'
import { getClassColor } from './ClassDetails'

const RaidDetails = () => {

    //holds the id param from the URL
    //used to identify the user that we are editing
    const {id} = useParams()

    const [players, setPlayers] = useState([])

    const [totalCombatTime, setTotalCombatTime] = useState(0)

    const [title, setTitle] = useState(null)

    const [isLoading, setIsLoading] = useState(true)

    const buffsColumns = [
      {id:28507, name:"Haste Potion"},
      {id:33256, name:"Well Fed"},
      {id:33082, name:"Strength V"},
      {id:28520, name:"Relentless Assult"},
      {id:35476, name:"Drums of Battle"}
    ]

    //const [startTime, setStartTime] = useState(0)
    //const [endTime, setEndTime] = useState(0)

    // const tableType = new GraphQLObjectType({
    //   name:'table',
    //   type:'',
    //   args:{
    //     abilityID: new GraphQLList(GraphQLID),
    //     dataType: new GraphQLEnumType()
    //   }
    // })

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
                  }
                  table(startTime:0, endTime:15000000)
                }
              }
            }`
          }
        }).then(function(res) {
            if(res.data.data){
              var fights = res.data.data.reportData.report.fights
              // hastePot : table(abilityID:28507, dataType:Buffs, startTime:0, endTime:15000000)
              // strengthFood : table(abilityID:33256, dataType:Buffs, startTime:0, endTime:15000000)
              // var hastePotions = res.data.data.reportData.report.hastePot.data.auras
              // var strengthFood = res.data.data.reportData.report.strengthFood.data.auras
              var dps = res.data.data.reportData.report.table.data.playerDetails.dps
              var healers = res.data.data.reportData.report.table.data.playerDetails.healers
              var tanks = res.data.data.reportData.report.table.data.playerDetails.tanks

              var tempTotalCombatTime = 0

              fights.forEach((fight)=>{
                tempTotalCombatTime = tempTotalCombatTime + (fight.endTime - fight.startTime)
              })

              setTotalCombatTime(tempTotalCombatTime)

              tanks.forEach((tank)=>{

                dps.forEach((player, i)=>{
                  if(tank.name === player.name){
                    tank.combatantInfo.gear = _.union(tank.combatantInfo.gear, player.combatantInfo.gear)
                    dps.splice(i, 1)
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

              var unValidatedPlayers = _.union(dps, healers, tanks)
              unValidatedPlayers.forEach((player, i)=>{
                if(player.combatantInfo.gear){
                  player.failedEnchants = validateEnchantments(player.combatantInfo.gear, player.specs[0])
                  player.failedGems = validateGems(player.combatantInfo.gear)
                }
                else{
                  unValidatedPlayers.splice(i, 1)
                }
              })
              // getUsage(unValidatedPlayers, hastePotions, 'hastePotion')
              // getUsage(unValidatedPlayers, strengthFood, 'strengthFood')
              setPlayers(_.cloneDeep(unValidatedPlayers))
              setTitle(res.data.data.reportData.report.title)
            }
        }).then(function(res){
          
          var queryString = ''
          players.forEach(player=>{
            queryString = queryString + `${player.name} : table(sourceID:${player.id}, dataType:Buffs, startTime:0, endTime:15000000)\n`
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
            console.log(players)
            players.forEach((player)=>{
              console.log(player)
              player.buffs = res.data.data.reportData.report[player.name].data.auras
              console.log(player)
            })
            setPlayers(_.cloneDeep(players))
            setIsLoading(false)
          })
        })
      }

    useEffect(() => {
        getRaidInfo()
    }, [])

    return ( isLoading ? <div>Loading</div> :
        <FlexContainer>
            <h1>{title}</h1>
            <div>
              <div style={{display:'flex'}}>
                <div style={{width:125, fontWeight:500}}>Player Name</div>
                <div style={{width:300, fontWeight:500}}>Enchant Fails</div>
                <div style={{width:300, fontWeight:500}}>Gem Fails</div>
                {buffsColumns.map((buff)=>{
                  return(
                    <div style={{width:125, fontWeight:500}}>
                      <div>{buff.name}</div>
                      <div>Uses - Up Time</div>
                    </div>
                  )
                })}
              </div>
                {players.map((player, i)=>{
                    return (<div key={player.name} style={{display:'flex', backgroundColor: i%2 === 0 ? "#DDDDDDDD" : null}}>
                              <div style={{width:125, backgroundColor:getClassColor(player.type), fontWeight:500, fontSize:18}}>{player.name}</div>
                              <div style={{display:'flex'}}> 
                                <Accordion sx={{width:300, backgroundColor:i%2 === 0 ? "#DDDDDDDD" : null}}>
                                  <AccordionSummary sx={{height:48}} expandIcon={<ExpandMore />}>
                                    <Typography>Enchant Fails ({player.failedEnchants.length})</Typography>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    <div>
                                      {player.failedEnchants.map((item)=>{return<div><Chip label={item.name+" - "+item.permanentEnchantName} size="small"/></div>})}
                                    </div>
                                  </AccordionDetails>
                                </Accordion>
                              </div>
                              <div>
                                <Accordion sx={{width:300, backgroundColor:i%2 === 0 ? "#DDDDDDDD" : null}}>
                                  <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Typography>Gem Fails ({player.failedGems.length})</Typography>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    <div>
                                      {player.failedGems.map((item)=>{
                                        return(
                                          <div>
                                            {item.failGems.map((gem)=>{
                                              return<div><Chip label={item.name+" - "+gem.id}/></div>
                                            })}
                                          </div>)})}
                                    </div>
                                  </AccordionDetails>
                                </Accordion>
                              </div>
                              {buffsColumns.map((buff)=>{
                                var playerBuff = player.buffs.find(pbuff => pbuff.id === buff.id)
                                return(
                                  <div style={{width:125}}>
                                    { playerBuff ? `${playerBuff.totalUses} - %${Math.round(playerBuff.totalUpTime/totalCombatTime * 100) / 100}` : '-'}
                                  </div>
                                )
                              })}
                            </div>)
                })}
            </div>
        </FlexContainer>
    )
}

export default RaidDetails
