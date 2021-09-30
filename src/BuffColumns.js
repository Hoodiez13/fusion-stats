import React from 'react'

const BuffColumns = ({player, buffsColumns, totalCombatTime}) => {
    return (
        <div style={{display:'flex'}}>
            {buffsColumns.map((buff)=>{
                var playerBuff = player.buffs.find(pbuff => pbuff.guid === buff.id)
                return(
                    <div key={`${player.name}-${buff.id}`} style={{width:125}}>
                        { playerBuff ? <div>{buff.uses?<span>{playerBuff.totalUses}</span>:null}{buff.uses && buff.uptime ? <span> - </span>:null}{buff.uptime ? <span>%{Math.round(playerBuff.totalUptime/totalCombatTime * 100)}</span>:null}</div> : '-'}
                    </div>
                )
            })}
        </div>
    )
}

export default BuffColumns
