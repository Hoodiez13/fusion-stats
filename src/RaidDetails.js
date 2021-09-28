import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { authToken } from './API'

const RaidDetails = () => {

    //holds the id param from the URL
    //used to identify the user that we are editing
    const {id} = useParams()

    const [players, setPlayers] = useState([])
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
                  startTime
                  endTime
                    rankedCharacters{
                      name
                    }
                  masterData{
                    abilities{
                      gameID
                      name
                      type
                    }
                  }
                }
              }
            }`
          }
        }).then(function(res) {
          if(res.data.data){
            setPlayers(res.data.data.reportData.report.rankedCharacters)
            var startTime = res.data.data.reportData.report.startTime
            var endTime = res.data.data.reportData.report.endTime
            console.log("Start: " + Date(startTime).toString() + " > " + startTime)
            console.log("End: " + Date(endTime).toString() + " > " + endTime)
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
                      events(abilityID: 28520, dataType:Buffs, startTime:${0}, endTime:${100000000000}){
                        data
                        nextPageTimestamp
                      }
                    }
                  }
                }`
              }
            }).then(function(res) {
              if(res.data.data){
                console.log(res.data.data)
              }
              else{
              }
            })
          }
          else{
          }
        })
      }

    useEffect(() => {
        getRaidInfo()
    }, [])

    return (
        <div>
            {id}
            <h1>Raiders</h1>
            <div>
                {players.map((player)=>{
                    return <div key={player.name}>{player.name}</div>
                })}
            </div>
        </div>
    )
}

export default RaidDetails
