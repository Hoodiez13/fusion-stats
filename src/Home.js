import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { authToken } from './API';
import RaidRow from './RaidRow';
import { useRaid } from './RaidContext';
import FlexContainer from './FlexContainer';

const Home = () => {

    const { raids, getFusion } = useRaid()

    useEffect(() => {
       if(!raids){
         getFusion()
       }
    }, [])

    return (
            <FlexContainer>
              <h1>Recent Logs</h1>
                {raids && raids.slice(0, 20).map((raid)=>{
                return <RaidRow key={raid.code} raid={raid}/>
                })}
            </FlexContainer>
    )
}

export default Home
