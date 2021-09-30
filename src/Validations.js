//I know several of these are the wrong stats.
//They are wrong on warcraft logs.
//I am following the data that the API sent. I can change later.

const casterApprovedEnchants = [
    3002, //HEAD      +22 Spell Power and +14 Critical Strike
    2995, //SHOULDERS +15 Critical Strike and +12 Spell Pen
    2661, //CHEST     +6  All Stats
    2748, //LEGS      +35 Spell Power and +20 Stamina
    2940, //BOOTS     Minor Speed and +9 Stamina
    2650, //BRACERS   +15 Spell Power
    2937, //GLOVES    +20 Spell Power
    2621, //CLOAK     +2% Threat Reduction
    2669, //WEAPON    +40 Spell Power
    2654  //SHIELD    +12 Intellect
]

const meleeApprovedEnchants = [
    3003, //HEAD      +17 Attack Power and +16 Critical Strike
    2986, //SHOULDERS +15 Attack Power and +10 Critical Strike
    2661, //CHEST     +6  All Stats
    3012, //LEGS      +25 Attack Power and +12 Critical Strike
    2939, //BOOTS     Minor Speed and +6 Agility
    2647, //BRACERS   +12 Strength
    684,  //GLOVES    +15 Strength
    368,  //CLOAK     +12 Agility
    2621, //CLOAK     +2% Threat Reduction
    2673, //WEAPON    Mongoose
]

const healerApprovedEnchants = [
    3001, //HEAD      +35 Healing and +7 mp5 --so messed up on wcl
    2980, //SHOULDERS +33 Healing and +4 mp5 --so messed up on wcl
    2953, //CHEST     +15 Resilience
    2791, //CHEST     +15 Spirit
    2661, //CHEST     +6  All Stats
    2746, //LEGS      +66 Healing and +20 Stamina
    2940, //BOOTS     Minor Speed and +9 Stamina
    2617, //BRACERS   +30 Healing
    2322, //GLOVES    +35 Healing
    2938, //CLOAK     +20 Spell Pen
    2621, //CLOAK     +2% Threat Reduction
    2343, //WEAPON    +81 Healing
]

const tankApprovedEnchants = [
    3003, //HEAD      +17 Attack Power and +16 Critical Strike
    2999, //HEAD      +16 Parry and +17 Dodge
    2978, //SHOULDERS +15 Dodge and +15 Stamina
    2661, //CHEST     +6  All Stats
    3013, //LEGS      +40 Stamina and +12 Agility
    2748, //LEGS      +35 Spell Power and +20 Stamina
    2940, //BOOTS     Minor Speed and +9 Stamina
    2649, //BOOTS     +12 Stamina
    2647, //BRACERS   +12 Strength
    2650, //BRACERS   +15 Spell Power
    2613, //GLOVES    +2% Threat
    368,  //CLOAK     +12 Agility
    2622, //CLOAK     +12 Dodge
    2673, //WEAPON    Mongoose
    2669, //WEAPON    +40 Spell Power
    1071, //SHIELD    +18 Stamina
    2655, //SHIELD    +15 Parry
]

export const validateEnchantments = (gear, spec) =>{
    var failGear = []
    var checklist = []

    switch(spec){
        case "Destruction": case "Affliction": case "Elemental": case "Balance": case "Shadow": case "Arcane": case "Fire": case "Frost":{
            checklist = casterApprovedEnchants
            break;
        }
        case "Fury": case "Arms": case "Combat": case "BeastMastery": case "Survival": case "Enhancement":{
            checklist = meleeApprovedEnchants
            break;
        }
        case "Holy": case "Discipline": case "Restoration":{
            checklist = healerApprovedEnchants
            break;
        }
        case "Gladiator": case "Protection": case "Feral": {
            checklist = tankApprovedEnchants
            break;
        }
        default:{

        }
    }

    gear.forEach((item) => {
        if(item.permanentEnchant && (item.slot !== 10 && item.slot !== 11) && !checklist.includes(item.permanentEnchant)){failGear.push(item)}
    })

    return failGear
}

export const validateGems = (gear) => {

    var failGear = []

    gear.forEach((item) => {
        var failGems = []
        if(item.gems){
            item.gems.forEach((gem)=>{
                if(gem.itemLevel < 70 && (gem.id !== 30598 && gem.id !== 28118)){
                    failGems.push(gem)
                }
            })
        }
        item.failGems = failGems
        if(item.failGems.length > 0){
            failGear.push(item)
        }
    })

    return failGear
}