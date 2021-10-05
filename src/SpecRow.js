import React from 'react'
import CastColumns from './CastColumns'
import BuffColumns from './BuffColumns'
import FailColumns from  './FailColumns'
import { getClassColor } from './ClassDetails'

const SpecRow = ({players, spec, castsColumns, buffsColumns, totalCombatTime}) => {
    return(
        players.map((player, i)=>{
            if(player.specs.includes(spec)){
              return (<div key={player.name} style={{display:'flex', backgroundColor: i%2 === 0 ? "#DDDDDDDD" : null}}>
                        <div style={{width:48, height:48}}><img src={`/media/${spec}jpg`} alt="Class Icon"/></div>
                        <div style={{width:125, backgroundColor:getClassColor(player.type), fontWeight:500, fontSize:18}}>{player.name}</div>
                        <CastColumns player={player} castsColumns={castsColumns}/>
                        <BuffColumns player={player} buffsColumns={buffsColumns} totalCombatTime={totalCombatTime}/>
                        <FailColumns player={player} i={i}/>
                      </div>)
            }
          })
    )
}

export default SpecRow
