import React from 'react'
import WarriorFury from './ClassIconImages/WarriorFury.jpg'
import WarriorProtection from './ClassIconImages/WarriorProtection.jpg'
import HunterMarksmen from './ClassIconImages/HunterMarksmen.jpg'
import MageFrost from './ClassIconImages/MageFrost.jpg'
import ShamanRestoration from './ClassIconImages/ShamanRestoration.jpg'
import WarlockDestruction from './ClassIconImages/WarlockDestruction.jpg'
import DruidRestoration from './ClassIconImages/DruidRestoration.jpg'
import RogueAssassination from './ClassIconImages/RogueAssassination.jpg'
import PreistHoly from './ClassIconImages/PriestHoly.jpg'

const ClassIcon = ({playerClass}) => {

    const getIcon = () =>{
        switch(playerClass) {
            case 'Warrior-Fury':
                return WarriorFury;
            case 'Warrior-Protection':
                return WarriorProtection;
            case 'Hunter-Marksmanship':
                return HunterMarksmen;
            case 'Mage-Frost':
                return MageFrost;
            case 'Shaman-Restoration':
                return ShamanRestoration;
            case 'Rogue-Assassination':
                return RogueAssassination;
            case 'Warlock-Destruction':
                return WarlockDestruction;
            case 'Priest-Holy':
                return PreistHoly;
            case 'Druid-Restoration':
                return DruidRestoration;
            default:
                return ''
        }
    }

  return (
    <img style={{width:32, height: 32}} src={getIcon()} alt={'Class Icon '+playerClass}/>
  )
}

export default ClassIcon