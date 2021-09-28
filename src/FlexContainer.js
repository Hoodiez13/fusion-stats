import React from 'react'

const FlexContainer = ({children}) => {
    return (
        <div style={{display:'flex'}}>
            <div style={{flex:2}}></div>
            <div style={{flex:8}}>{children}</div>
            <div style={{flex:2}}></div>
        </div>
    )
}

export default FlexContainer
