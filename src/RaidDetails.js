import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { authToken } from './API'
import _ from 'lodash'
import FlexContainer from './FlexContainer'
import { Chip, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material'
import { validateEnchantments, validateGems } from './Validations'
import { ExpandMore } from '@mui/icons-material'

const RaidDetails = () => {

    //holds the id param from the URL
    //used to identify the user that we are editing
    const {id} = useParams()

    const [players, setPlayers] = useState([])

    const [title, setTitle] = useState(null)
    //const [startTime, setStartTime] = useState(0)
    //const [endTime, setEndTime] = useState(0)

    const getRaidInfo = () =>{
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
                  table(startTime:0, endTime:10000000000)
                }
              }
            }`
          }
        }).then(function(res) {
            if(res.data.data){

              var dps = res.data.data.reportData.report.table.data.playerDetails.dps
              var healers = res.data.data.reportData.report.table.data.playerDetails.healers
              var tanks = res.data.data.reportData.report.table.data.playerDetails.tanks

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
              console.log(unValidatedPlayers)
              unValidatedPlayers.forEach((player, i)=>{
                console.log(player)
                if(player.combatantInfo.gear){
                  player.failedEnchants = validateEnchantments(player.combatantInfo.gear, player.specs[0])
                  player.failedGems = validateGems(player.combatantInfo.gear)
                }
                else{
                  unValidatedPlayers.splice(i, 1)
                }
              })

              setPlayers(unValidatedPlayers)
              setTitle(res.data.data.reportData.report.title)
            }
        })
      }

    useEffect(() => {
        getRaidInfo()
    }, [])

    return (
        <FlexContainer>
            <h1>{title}</h1>
            <div>
              {console.log(players)}
                {players.map((player)=>{
                    return (<div key={player.name} style={{display:'flex'}}>
                              <div style={{flex:1}}>{player.name}</div>
                              <div style={{flex:11, display:'flex'}}> 
                                <Accordion sx={{width:300}}>
                                  <AccordionSummary sx={{height:48}} expandIcon={<ExpandMore />}>
                                    <Typography>Enchant Fails ({player.failedEnchants.length})</Typography>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    <div>
                                      {player.failedEnchants.map((item)=>{return<div><Chip label={item.name+" - "+item.permanentEnchantName} size="small"/></div>})}
                                    </div>
                                  </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{width:300}}>
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
                            </div>)
                })}
            </div>
        </FlexContainer>
    )
}

export default RaidDetails
