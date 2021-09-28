import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { authToken } from './API';
import { NavLink } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';

const Raids = () => {

    const [raids, setRaids] = useState(null)

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
            reportData {
              reports(limit:12, guildName:"Fusion", guildServerSlug:"benediction", guildServerRegion:"us"){
                data{
                  code
                  owner{
                    name
                  }
                  title
                  zone{
                    name
                  }
                }
              }
            }
          }`
        }
      }).then(function(res) {
        if(res.data.data){
          console.log(res.data.data)
          setRaids(res.data.data.reportData.reports.data)
        }
        else{
        }
      })
    }

    return (
      <div>
         <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                  Home
                </Typography>
                <div style={{width:16}}></div>
                <Typography variant="h6" color="inherit" component="div">
                  Raids
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
          <div style={{display:'flex'}}>
            <div style={{flex:2}}></div>
            <div style={{flex:8}}>
              <button onClick={()=>{getFusion()}}>Test</button>
                {raids && raids.map((raid)=>{
                return (<div key={raid.code}>
                          <NavLink to={"/raid/"+raid.code}>
                            <div style={{display:'flex', width:'100%'}}>
                              <div style={{flex:1}}>{`${raid.title ? raid.title : 'N/A'}`}</div>
                              <div style={{flex:1}}>{`Zone: ${raid.zone ? raid.zone.name : 'N/A'}`}</div>
                              <div style={{flex:1}}>{`Owner: ${raid.owner ? raid.owner.name : 'N/A'}`}</div>
                            </div>
                          </NavLink>
                        </div>)
                })}
            </div>
            <div style={{flex:2}}></div>
        </div>
      </div>
    )
}

export default Raids
