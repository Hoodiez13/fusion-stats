import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import RaidRow from './RaidRow'
import { useRaid } from './RaidContext'
import FlexContainer from './FlexContainer'


const RaidHome = () => {

    const { id } = useParams()
    const { raids, getFusion } = useRaid()

    useEffect(() => {
        if(!raids){
            getFusion()
          }
    }, [])

    return (
        <div>
            <h1>Raid {id}</h1>
            <FlexContainer>
                {raids && raids.filter(raid => raid.title.includes(id)).map((raid)=>{
                    return <RaidRow key={raid.code} raid={raid}/>
                    })}
            </FlexContainer>
        </div>
    )
}

export default RaidHome
