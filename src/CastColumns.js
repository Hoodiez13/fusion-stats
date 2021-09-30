import React from 'react'

const CastColumns = ({player, castsColumns}) => {
    return (
        <div style={{display:'flex'}}>
            {castsColumns.map((cast)=>{
                var playerCast = player.casts.find(pcast => pcast.guid === cast.id)
                return(
                    <div key={`${player.name}-${cast.id}`} style={{width:125}}>
                        { playerCast ? <span>{playerCast.total}</span>: ' - '}
                    </div>
                )
            })}
        </div>
    )
}

export default CastColumns
