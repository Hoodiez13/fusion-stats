import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { authToken } from "./API";
import _ from "lodash";
import FlexContainer from "./FlexContainer";
import { validateEnchantments, validateGems } from "./Validations";
import { getClassColor } from "./ClassDetails";
import FailColumns from "./FailColumns";
import BuffColumns from "./BuffColumns";
import CastColumns from "./CastColumns";
import Loading from "./Loading";
import SpecRow from "./SpecRow";
import { DataGrid } from "@mui/x-data-grid";
import { Height } from "@mui/icons-material";
import { Checkbox, FormControlLabel } from "@mui/material";

const RaidDetails = () => {
  //holds the id param from the URL
  //used to identify the user that we are editing
  const { id } = useParams();

  const [players, setPlayers] = useState(null);

  const [totalCombatTime, setTotalCombatTime] = useState(0);

  const [title, setTitle] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(false);

  const [deathEvents, setDeathEvents] = useState([]);

  const [filteredPlayers, setFilteredPlayers] = useState([]);

  const [tankFilter, setTankFilter] = useState(true);

  const [healerFilter, setHealerFilter] = useState(true);

  const [dpsFilter, setDPSFilter] = useState(true);

  const [allFilter, setAllFilter] = useState(true);

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

  const buffsColumns = [
    { id: 33256, name: "Well Fed", uses: true, uptime: true },
    { id: 33082, name: "Strength V", uses: true, uptime: true },
    { id: 28520, name: "Relentless Assult", uses: false, uptime: true },
  ];
  //28521 28518 28540 28520 flask
  //33261 43771 33257 33263 33254 33268 43764 33256 well fed

  const castsColumns = [
    { id: 28507, name: "Haste Potion", uses: true },
    { id: 35476, name: "Drums of Battle", uses: true },
  ];

  const columns = [
    {
      headerName: "",
      field: "icon",
      width: 72,
      renderCell: (params) => (
        <div>
          <img src={`/media/${params.row.icon}.jpg`} alt="Class Icon" />
        </div>
      ),
    },
    {
      headerName: "Name",
      field: "name",
      width: 200,
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
    {
      headerName: "Sunders",
      field: "sunders",
      width: 100,
      align: "center",
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
      headerName: "Dispels",
      field: "dispels",
      width: 100,
      align: "center",
      valueGetter: (value, row) => {
        var sunders = row.casts.find((cast) => cast.name === "Dispel Magic");
        if (sunders) {
          return sunders.total;
        } else {
          return 0;
        }
      },
    },
    {
      headerName: "Deaths",
      field: "deaths",
      width: 100,
      align: "center",
      valueGetter: (value, row) => {
        var deaths = 0;
        deathEvents.forEach((event) => {
          if (event.name === row.name) {
            deaths = deaths + 1;
          }
        });
        return deaths;
      },
    },
    { headerName: "Damage Done", field: "dmgDone", width: 250 },
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
          var fights = res.data.data.reportData.report.fights;
          var dps =
            res.data.data.reportData.report.table.data.playerDetails.dps;
          var healers =
            res.data.data.reportData.report.table.data.playerDetails.healers;
          var tanks =
            res.data.data.reportData.report.table.data.playerDetails.tanks;

          var tempTotalCombatTime = 0;

          fights.forEach((fight) => {
            if (fight.encounterID > 0) {
              tempTotalCombatTime =
                tempTotalCombatTime + (fight.endTime - fight.startTime);
            }
          });

          setTotalCombatTime(tempTotalCombatTime);

          //DEATH EVENTS
          if (res.data.data.reportData.report.table.data.deathEvents) {
            setDeathEvents(
              res.data.data.reportData.report.table.data.deathEvents
            );
          } else {
            setDeathEvents([]);
          }

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
                healer.splice(i, 1);
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

          unValidatedPlayers = _.union(dps, healers, tanks);
          unValidatedPlayers.forEach((player, index, object) => {
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
          if (player.role == "healer") {
            tempFilteredPlayers.push(player);
          }
        });
      }

      if (dpsFilter) {
        players.forEach((player) => {
          if (player.role == "dps") {
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
          {console.log(players)}
          <DataGrid
            columns={columns}
            rows={filteredPlayers}
            density="compact"
            initialState={{
              sorting: {
                sortModel: [{ field: "icon", sort: "desc" }],
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RaidDetails;
