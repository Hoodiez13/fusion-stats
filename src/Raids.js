import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { authToken } from './API';
import { NavLink } from 'react-router-dom';

const Raids = () => {

    const [raids, setRaids] = useState([])

    const getFusion = () =>{
      axios.request({
        url: "api/v2/client",
        method: "post",
        baseURL: "https://classic.warcraftlogs.com/",
        headers: {
          "Authorization": `Bearer ${authToken}`
        },
        data:{
          query:`{
            guildData {
              guild(name:"Fusion", serverSlug:"benediction", serverRegion:"us"){
                description
                name
                server
                {
                  name
                }
                attendance{
                  data{
                    code
                    startTime
                    zone{
                      name
                    }
                  }
                }
              }
            }
          }`
        }
      }).then(function(res) {
        if(res.data.data){
          setRaids(res.data.data.guildData.guild.attendance.data)
        }
        else{
        }
      })
    }

    return (
        <div>
            <button onClick={()=>{getFusion()}}>Test</button>
            <div>
                {raids.map((raid)=>{
                return <div key={raid.code}><NavLink to={"/raid/"+raid.code}>{`Zone: ${raid.zone.name} Start Time: ${Date(raid.startTime).toString()} Code:${raid.code}`}</NavLink></div>
                })}
            </div>
        </div>
    )
}

export default Raids
