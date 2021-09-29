export const getUsage = (players, consumeArray, objectName) =>{
    consumeArray.forEach((consume)=>{
        const {totalUptime, totalUses, ...rest} = consume
        players.find(player => player.id === consume.id)[objectName] = {uptime:totalUptime, uses:totalUses}
    })
}