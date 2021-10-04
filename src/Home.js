import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { authToken } from './API';
import RaidRow from './RaidRow';
import { useRaid } from './RaidContext';
import FlexContainer from './FlexContainer';
import Loading from './Loading';

const Home = () => {

    const { raids, getFusion } = useRaid()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
      setLoading(true)
       if(!raids){
         getFusion()
       }
       setLoading(false)
    }, [])

    return (loading ? <Loading/> :
            <FlexContainer>
              <h1>Recent Logs</h1>
                {raids && raids.slice(0, 20).map((raid)=>{
                return <RaidRow key={raid.code} raid={raid}/>
                })}
            </FlexContainer>
    )
}

export default Home
