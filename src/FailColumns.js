import React from 'react'
import { AccordionDetails, Chip, Accordion, AccordionSummary } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

const CustomAccordionSummary = styled(AccordionSummary)`

    & .MuiButtonBase-root {
        height:100px;
    }

    & .MuiAccordionSummary-content {
        margin:0;
    }
`

const FailColumns = ({player, i}) => {

    return (
       <div style={{display:'flex'}}> 
            <Accordion sx={{width:300, backgroundColor:i%2 === 0 ? "#DDDDDDDD" : null}}>
                <CustomAccordionSummary expandIcon={<ExpandMore />}>
                {player.failedEnchants ? <div>Enchant Fails ({player.failedEnchants.length})</div>: <p style={{color:'red'}}>Error</p>}
                </CustomAccordionSummary>
                <AccordionDetails>
                <div>
                    {player.failedEnchants && player.failedEnchants.map((item)=>{return<div><Chip label={item.name+" - "+item.permanentEnchantName} size="small"/></div>})}
                </div>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{width:300, backgroundColor:i%2 === 0 ? "#DDDDDDDD" : null}}>
                <CustomAccordionSummary expandIcon={<ExpandMore />}>
                {player.failedGems ? <div>Gem Fails ({player.failedGems.length})</div>: <p style={{color:'red'}}>Error</p>}
                </CustomAccordionSummary>
                <AccordionDetails>
                <div>
                    {player.failedGems && player.failedGems.map((item)=>{
                    return(
                        <div>
                        {item.failGems.map((gem)=>{
                            return<div><Chip label={item.name+" - ID:"+gem.id}/></div>
                        })}
                        </div>)})}
                </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default FailColumns
