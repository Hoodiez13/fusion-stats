import React from 'react'
import { NavLink } from 'react-router-dom'

const RaidRow = ({raid}) => {
    return (
        <div>
            <NavLink to={"/raiddetails/"+raid.code}>
                <div style={{display:'flex', width:'100%'}}>
                    <div style={{flex:1}}>{`${raid.title ? raid.title : 'N/A'}`}</div>
                    <div style={{flex:1}}>{`Zone: ${raid.zone ? raid.zone.name : 'N/A'}`}</div>
                    <div style={{flex:1}}>{`Owner: ${raid.owner ? raid.owner.name : 'N/A'}`}</div>
                </div>
            </NavLink>
        </div>
    )
}

export default RaidRow
