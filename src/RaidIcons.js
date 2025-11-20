import React from 'react'
import MoltenCore from './RaidIconImages/MoltenCore.jpg'
import Onyxia from './RaidIconImages/Onyxia.jpg'

const RaidIcons = ({raid}) => {

    const getIcon = () =>{
        switch(raid) {
            case 'Molten Core':
                return MoltenCore;
            case 'Onyxia':
                return Onyxia;
            default:
                return ''
        }
    }

  return (
    <img style={{width:32, height: 32}} src={getIcon()} alt={'Raid Image '+raid}/>
  )
}

export default RaidIcons