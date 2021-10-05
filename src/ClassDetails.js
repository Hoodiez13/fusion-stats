export const getClassColor = (classname) =>{
    var color = "#DDD"

    switch(classname){
        case "Druid":{
            color = '#FF7C0A'
            break
        }
        case "Mage":{
            color = '#3FC7EB'
            break
        }
        case "Hunter":{
            color = '#AAD372'
            break
        }
        case "Paladin":{
            color = '#F48CBA'
            break
        }
        case "Priest":{
            color = '#FFFFFF'
            break
        }
        case "Shaman":{
            color = '#0070DD'
            break
        }
        case "Warlock":{
            color = '#8788EE'
            break
        }
        case "Warrior":{
            color = '#C69B6D'
            break
        }
        case "Rogue":{
            color = '#FFF468'
            break
        }
        default:{
            break
        }
    }

    return color
}
