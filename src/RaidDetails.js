import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { authToken } from "./API";
import _ from "lodash";
import { validateEnchantments, validateGems } from "./Validations";
import { getClassColor } from "./ClassDetails";
import Loading from "./Loading";
import { DataGrid } from "@mui/x-data-grid";
import { Checkbox, FormControlLabel, useTheme } from "@mui/material";
import ClassIcon from "./ClassIcon";

const getColorFade = (percent, max, min) =>{
return Math.round((percent-min)/(max-min)*255).toString(16).padStart(2, '0')
}

const RaidDetails = () => {
  //holds the id param from the URL
  //used to identify the user that we are editing
  const { id } = useParams();

  const theme = useTheme()

  const [players, setPlayers] = useState(null);

  const [title, setTitle] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(false);

  const [filteredPlayers, setFilteredPlayers] = useState([]);

  const [tankFilter, setTankFilter] = useState(true);

  const [healerFilter, setHealerFilter] = useState(true);

  const [dpsFilter, setDPSFilter] = useState(true);

  const [allFilter, setAllFilter] = useState(true);

  const [sapperRange, setSapperRange] = useState({min:null, max:null})
  const [sunderRange, setSunderRange] = useState({min:null, max:null})
  const [dynamiteRange, setDynamiteRange] = useState({min:null, max:null})
  const [grenadeRange, setGrenadeRange] = useState({min:null, max:null})
  const [dispelRange, setDispelRange] = useState({min:null, max:null})
  const [damageRange, setDamageRange] = useState({min:null, max:null})
  const [deathRange, setDeathRange] = useState({min:null, max:null})
  const [expDmgRange, setExpDmgRange] = useState({min:null, max:null})

  var unValidatedPlayers = [];

  const handleTankFilter = (e) => {
    if (!e.target.checked) {
      setAllFilter(false);
    }
    setTankFilter(e.target.checked);
  };

  const handleHealerFilter = (e) => {
    if (!e.target.checked) {
      setAllFilter(false);
    }
    setHealerFilter(e.target.checked);
  };

  const handleDPSFilter = (e) => {
    if (!e.target.checked) {
      setAllFilter(false);
    }
    setDPSFilter(e.target.checked);
  };

  const handleAllFilter = (e) => {
    setDPSFilter(e.target.checked);
    setHealerFilter(e.target.checked);
    setTankFilter(e.target.checked);
    setAllFilter(e.target.checked);
  };

  const columns = [
    {
      headerName: "",
      field: "icon",
      width: 32,
      renderCell: (params) => (
        <div>
          <ClassIcon playerClass={params.row.icon}/>
        </div>
      ),
    },
    {
      headerName: "Name",
      field: "name",
      width: 125,
      renderCell: (params) => (
        <div
          style={{
            color: getClassColor(params.row.type),
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          {params.row.name}
        </div>
      ),
    },
    { headerName: "Damage Done", field: "dmgDone", width: 150,
      renderCell: (params) => (
        
        <div style={{
          backgroundColor:theme.palette.primary.main+getColorFade(params.value, damageRange.max, damageRange.min)
        }}>
          {params.value}
        </div>
      ), },
    {
      headerName: "Sunders",
      field: "sunders",
      width: 100,
      align: "center",
      renderCell: (params) => (
        
        <div style={{
          backgroundColor:theme.palette.primary.main+getColorFade(params.value, sunderRange.max, sunderRange.min)
        }}>
          {params.value}
        </div>
      ),
      valueGetter: (value, row) => {
        var sunders = row.casts.find((cast) => cast.name === "Sunder Armor");
        if (sunders) {
          return sunders.total;
        } else {
          return 0;
        }
      },
    },

    {
      headerName: "Sapper Charges",
      field: "sappers",
      width: 100,
      align: "center",
      renderCell: (params) => (
        
        <div style={{
          backgroundColor:theme.palette.primary.main+getColorFade(params.value, sapperRange.max, sapperRange.min)
        }}>
          {params.value}
        </div>
      ),
      valueGetter: (value, row) => {
        var sappers = row.casts.find((cast) => cast.name === "Goblin Sapper Charge");
        if (sappers) {
          return sappers.total;
        } else {
          return 0;
        }
      },
    },
    {
      headerName: "Dynamite",
      field: "dynamite",
      width: 100,
      align: "center",
      renderCell: (params) => (
        
        <div style={{
          backgroundColor:theme.palette.primary.main+getColorFade(params.value, dynamiteRange.max, dynamiteRange.min)
        }}>
          {params.value}
        </div>
      ),
      valueGetter: (value, row) => {
        var dynamite = row.casts.find((cast) => cast.name === "Dense Dynamite");
        if (dynamite) {
          return dynamite.total;
        } else {
          return 0;
        }
      },
    },
    {
      headerName: "Grenade",
      field: "grenade",
      width: 100,
      align: "center",
      renderCell: (params) => (
        
        <div style={{
          backgroundColor:theme.palette.primary.main+getColorFade(params.value, grenadeRange.max, grenadeRange.min)
        }}>
          {params.value}
        </div>
      ),
      valueGetter: (value, row) => {
        var grenade = row.casts.find((cast) => cast.name === "Iron Grenade");
        if (grenade) {
          return grenade.total;
        } else {
          return 0;
        }
      },
    },
    {
      headerName: "Explosive Damage",
      field: "expDmg",
      width: 100,
      align: "center",
      renderCell: (params) => (
        
        <div style={{
          backgroundColor:theme.palette.primary.main+getColorFade(params.value, expDmgRange.max, expDmgRange.min)
        }}>
          {params.value}
        </div>
      )
    },
    {
      headerName: "Dispels",
      field: "dispels",
      width: 100,
      align: "center",
      renderCell: (params) => (
        
        <div style={{
          backgroundColor:theme.palette.primary.main+getColorFade(params.value, dispelRange.max, dispelRange.min)
        }}>
          {params.value}
        </div>
      ),
      valueGetter: (value, row) => {
        var sunders = row.casts.find((cast) => cast.name === "Dispel Magic");
        if (sunders) {
          return sunders.total;
        } else {
          return 0;
        }
      },
    },
    { headerName: "Deaths", field: "deaths", width: 75,
      align: "center",
      renderCell: (params) => (
        
        <div style={{
          backgroundColor:theme.palette.error.main+getColorFade(params.value, deathRange.max, deathRange.min)
        }}>
          {params.value}
        </div>
      ), },
  ];

  const getRaidInfo = () => {
    setIsLoading(true);

    axios
      .request({
        url: "api/v2/client",
        method: "post",
        baseURL: "https://classic.warcraftlogs.com/",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          query: `{
              reportData {
                report(code:"${id}"){
                  title
                  fights{
                    startTime
                    endTime
                    encounterID
                    name
                  }
                  table(startTime:0, endTime:15000000)

                }
              }
            }`,
        },
      })
      .then(function (res) {
        if (res.data.data) {
          var dmgTable = res.data.data.reportData.report.table.data.damageDone
          //var fights = res.data.data.reportData.report.fights;
          var dps =
            res.data.data.reportData.report.table.data.playerDetails.dps;
          var healers =
            res.data.data.reportData.report.table.data.playerDetails.healers;
          var tanks =
            res.data.data.reportData.report.table.data.playerDetails.tanks;

          tanks.forEach((tank) => {
            dps.forEach((player, i) => {
              if (player.type === "Unknown") {
                dps.splice(i, 1);
              } else {
                if (tank.name === player.name) {
                  tank.combatantInfo.gear = _.union(
                    tank.combatantInfo.gear,
                    player.combatantInfo.gear
                  );
                  dps.splice(i, 1);
                }
              }
            });

            healers.forEach((healer, i) => {
              if (tank.name === healer.name) {
                tank.combatantInfo.gear = _.union(
                  tank.combatantInfo.gear,
                  healer.combatantInfo.gear
                );
                healers.splice(i, 1);
              }
            });
            tank.role = "tank";
          });

          healers.forEach((healer) => {
            dps.forEach((player, i) => {
              if (healer.name === player.name) {
                healer.combatantInfo.gear = _.union(
                  healer.combatantInfo.gear,
                  player.combatantInfo.gear
                );
                dps.splice(i, 1);
              }
            });
            healer.role = "healer";
          });

          dps.forEach((dpser) => {
            dpser.role = "dps";
          });

          var tempDamageMin = null
          var tempDamageMax = null
          var tempDeathMin = null
          var tempDeathMax = null
          unValidatedPlayers = _.union(dps, healers, tanks);
          unValidatedPlayers.forEach((player, index, object) => {

            player.dmgDone = dmgTable.find(p=>p.name===player.name)?dmgTable.find(p=>p.name===player.name).total:0
            var deaths = 0;
            res.data.data.reportData.report.table.data.deathEvents.forEach((event) => {
              if (event.name === player.name) {
                deaths = deaths + 1;
              }
            });
            player.deaths= deaths

            //Confirming Damage Range
            if (player.dmgDone) {
              if(tempDamageMax === null){
                tempDamageMax = player.dmgDone
              }else{
                if( player.dmgDone > tempDamageMax){
                  tempDamageMax = player.dmgDone
                }
              }

              if(tempDamageMin === null){
                tempDamageMin = player.dmgDone
              }else{
                if( player.dmgDone < tempDamageMin){
                  tempDamageMin = player.dmgDone
                }
              }
            }else{
              tempDamageMin = 0
            }

            //Confirming Death Range
            if (deaths) {
              if(tempDeathMax === null){
                tempDeathMax = deaths
              }else{
                if( deaths > tempDeathMax){
                  tempDeathMax = deaths
                }
              }

              if(tempDeathMin === null){
                tempDeathMin = deaths
              }else{
                if( deaths < tempDeathMin){
                  tempDeathMin = deaths
                }
              }
            }else{
              tempDeathMin = 0
            }
            
            if (player.combatantInfo.gear) {
              player.failedEnchants = validateEnchantments(
                player.combatantInfo.gear,
                player.specs[0]
              );
              player.failedGems = validateGems(player.combatantInfo.gear);
            } else {
              object.splice(index, 1);
            }
          });

          setDeathRange({min:tempDeathMin, max:tempDeathMax})
          setDamageRange({min:tempDamageMin, max:tempDamageMax})
          setPlayers(_.cloneDeep(unValidatedPlayers));
          setTitle(res.data.data.reportData.report.title);
        } else {
          setError(true);
          setIsLoading(false);
        }
      })
      .then(() => {
        if (!error) {
          var queryString = "";
          unValidatedPlayers.forEach((player) => {
            queryString =
              queryString +
              `Buffs${player.id} : table(sourceID:${player.id}, dataType:Buffs, startTime:0, endTime:15000000)\n`;
            queryString =
              queryString +
              `Casts${player.id} : table(sourceID:${player.id}, dataType:Casts, startTime:0, endTime:15000000)\n`;
          });

          queryString =
          queryString +
          `sapper : table(abilityID:13241, dataType:DamageDone, startTime:0, endTime:15000000)\n`;
          queryString =
          queryString +
          `dynamite : table(abilityID:23063, dataType:DamageDone, startTime:0, endTime:15000000)\n`;
          axios
            .request({
              url: "api/v2/client",
              method: "post",
              baseURL: "https://classic.warcraftlogs.com/",
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
              data: {
                query: `{
                  reportData {
                    report(code:"${id}"){
                      ${queryString}
                    }
                  }
                }`,
              },
            })
            .then((res) => {
              if (res.data.data) {

                var sapperDamage =  res.data.data.reportData.report.sapper.data.entries
                var dynamiteDamage = res.data.data.reportData.report.dynamite.data.entries

                unValidatedPlayers.forEach((player) => {
                  player.buffs =
                    res.data.data.reportData.report[
                      `Buffs${player.id}`
                    ].data.auras;
                  player.casts =
                    res.data.data.reportData.report[
                      `Casts${player.id}`
                    ].data.entries;
                });
                

                var tempSapperMax = null
                var tempSapperMin = null
                var tempDynamiteMax = null
                var tempDynamiteMin = null
                var tempGrenadeMax = null
                var tempGrenadeMin = null
                var tempSunderMax = null
                var tempSunderMin = null
                var tempDispelMax = null
                var tempDispelMin = null
                var tempExpDmgMax = null
                var tempExpDmgMin = null

                  unValidatedPlayers.forEach((player)=>{

                    var tempExpDmgTotal = 0

                    sapperDamage.forEach((rec)=>{
                      if(rec.id === player.id){
                        tempExpDmgTotal = tempExpDmgTotal + rec.total
                      }
                    })

                    dynamiteDamage.forEach((rec)=>{
                      if(rec.id === player.id){
                        tempExpDmgTotal = tempExpDmgTotal + rec.total
                      }
                    })

                    player.expDmg = tempExpDmgTotal

                    //Confirming Exp Damage Range
                    if (tempExpDmgTotal) {
                      if(tempExpDmgMax === null){
                        tempExpDmgMax = tempExpDmgTotal
                      }else{
                        if( tempExpDmgTotal > tempExpDmgMax){
                          tempExpDmgMax = tempExpDmgTotal
                        }
                      }

                      if(tempExpDmgMin === null){
                        tempExpDmgMin = tempExpDmgTotal
                      }else{
                        if( tempExpDmgTotal < tempExpDmgMin){
                          tempExpDmgMin = tempExpDmgTotal
                        }
                      }
                    }else{
                      tempExpDmgMin = 0
                    }

                    //Confirming Sapper Range
                    var sappers = player.casts.find((cast) => cast.name === "Goblin Sapper Charge");
                    if (sappers) {
                      if(tempSapperMax === null){
                        tempSapperMax = sappers.total
                      }else{
                        if( sappers.total > tempSapperMax){
                          tempSapperMax = sappers.total
                        }
                      }

                      if(tempSapperMin === null){
                        tempSapperMin = sappers.total
                      }else{
                        if( sappers.total < tempSapperMin){
                          tempSapperMin = sappers.total
                        }
                      }
                    }else{
                      tempSapperMin = 0
                    }

                    //Confirming Sunder Range
                    var sunders = player.casts.find((cast) => cast.name === "Sunder Armor");
                    if (sunders) {
                      if(tempSunderMax === null){
                        tempSunderMax = sunders.total
                      }else{
                        if( sunders.total > tempSunderMax){
                          tempSunderMax = sunders.total
                        }
                      }

                      if(tempSunderMin === null){
                        tempSunderMin = sunders.total
                      }else{
                        if( sunders.total < tempSunderMin){
                          tempSunderMin = sunders.total
                        }
                      }
                    }else{
                      tempSunderMin = 0
                    }

                    //Confirming Dynamite Range
                    var dynamite = player.casts.find((cast) => cast.name === "Dense Dynamite");
                    if (dynamite) {
                      if(tempDynamiteMax === null){
                        tempDynamiteMax = dynamite.total
                      }else{
                        if( dynamite.total > tempDynamiteMax){
                          tempDynamiteMax = dynamite.total
                        }
                      }

                      if(tempDynamiteMin === null){
                        tempDynamiteMin = dynamite.total
                      }else{
                        if( dynamite.total < tempDynamiteMin){
                          tempDynamiteMin = dynamite.total
                        }
                      }
                    }else{
                      tempDynamiteMin = 0
                    }

                    //Confirming Grenade Range
                    var grenade = player.casts.find((cast) => cast.name === "Iron Grenade");
                    if (grenade) {
                      if(tempGrenadeMax === null){
                        tempGrenadeMax = grenade.total
                      }else{
                        if( grenade.total > tempGrenadeMax){
                          tempGrenadeMax = grenade.total
                        }
                      }

                      if(tempGrenadeMin === null){
                        tempGrenadeMin = grenade.total
                      }else{
                        if( grenade.total < tempGrenadeMin){
                          tempGrenadeMin = grenade.total
                        }
                      }
                    }else{
                      tempGrenadeMin = 0
                    }

                    //Confirming Dispel Range
                    var dispels = player.casts.find((cast) => cast.name === "Dispel Magic");
                    if (dispels) {
                      if(tempDispelMax === null){
                        tempDispelMax = dispels.total
                      }else{
                        if( dispels.total > tempDispelMax){
                          tempDispelMax = dispels.total
                        }
                      }

                      if(tempDispelMin === null){
                        tempDispelMin = dispels.total
                      }else{
                        if( dispels.total < tempDispelMin){
                          tempDispelMin = dispels.total
                        }
                      }
                    }else{
                      tempDispelMin = 0
                    }

                  })

                setExpDmgRange({min:tempExpDmgMin, max:tempExpDmgMax})
                setDispelRange({min:tempDispelMin, max:tempDispelMax})
                setDynamiteRange({min:tempDynamiteMin, max:tempDynamiteMax})
                setSunderRange({min:tempSunderMin, max:tempSunderMax})
                setSapperRange({min:tempSapperMin, max:tempSapperMax})
                setGrenadeRange({min:tempGrenadeMin, max:tempGrenadeMax})
                setPlayers(_.cloneDeep(unValidatedPlayers));
              } else {
                setError(true);
                setIsLoading(false);
              }
            })
            .then(() => {
              setIsLoading(false);
            });
        }
      });
  };

  useEffect(() => {
    if (!players) {
      getRaidInfo();
    }
  }, []);

  useEffect(() => {
    var tempFilteredPlayers = [];

    if (players) {
      if (tankFilter) {
        players.forEach((player) => {
          if (player.role === "tank") {
            tempFilteredPlayers.push(player);
          }
        });
      }

      if (healerFilter) {
        players.forEach((player) => {
          if (player.role === "healer") {
            tempFilteredPlayers.push(player);
          }
        });
      }

      if (dpsFilter) {
        players.forEach((player) => {
          if (player.role === "dps") {
            tempFilteredPlayers.push(player);
          }
        });
      }

      setFilteredPlayers(tempFilteredPlayers);
    }
  }, [tankFilter, healerFilter, dpsFilter, players]);

  return isLoading ? (
    <Loading />
  ) : (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex" }}>
        <h1>{title}</h1>
        <div style={{ padding: "48px 0px 0px 48px" }}>
          <FormControlLabel
            control={
              <Checkbox
                disabled={allFilter}
                checked={allFilter}
                onChange={handleAllFilter}
              />
            }
            label="All"
          />
          <FormControlLabel
            control={
              <Checkbox checked={tankFilter} onChange={handleTankFilter} />
            }
            label="Tanks"
          />
          <FormControlLabel
            control={
              <Checkbox checked={healerFilter} onChange={handleHealerFilter} />
            }
            label="Healers"
          />
          <FormControlLabel
            control={
              <Checkbox checked={dpsFilter} onChange={handleDPSFilter} />
            }
            label="DPS"
          />
        </div>
      </div>
      {error ? (
        <div>Error with this log.</div>
      ) : (
        <div style={{ height: "calc(100vh - 200px)", width: "100%" }}>
        <div>max: {sapperRange.max}</div>
        <div>min: {sapperRange.min}</div>
          <DataGrid
            columns={columns}
            rows={filteredPlayers}
            density="compact"
            initialState={{
              sorting: {
                sortModel: [{ field: "icon", sort: "desc" }],
              },
              aggregation: {
                model: {
                  sunders: 'sum',
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RaidDetails;
