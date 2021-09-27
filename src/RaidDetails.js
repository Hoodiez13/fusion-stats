import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { authToken } from './API'

const RaidDetails = () => {

    //holds the id param from the URL
    //used to identify the user that we are editing
    const {id} = useParams()

    const [players, setPlayers] = useState([])

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
                    rankings
                    events(abilityID:11597){
                        data
                    }
                    rankedCharacters{
                      name
                    }
                }
              }
            }`
          }
        }).then(function(res) {
          if(res.data.data){
              console.log(res.data.data.reportData.report.rankings)
            setPlayers(res.data.data.reportData.report.rankedCharacters)
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
