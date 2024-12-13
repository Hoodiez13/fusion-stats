import React, { useContext, createContext, useState } from "react";
import axios from "axios";
import { authToken } from "./API";

const RaidContext = createContext();

export function useRaid() {
  return useContext(RaidContext);
}

export default function RaidProvider({ children }) {
  const [raids, setRaids] = useState(null);

  const getFusion = () => {
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
                reports(limit:100, guildName:"Fusion", guildServerSlug:"nightslayer", guildServerRegion:"us"){
                  data{
                    code
                    owner{
                      name
                    }
                    title
                    zone{
                      name
                    }
                  }
                }
              }
            }`,
        },
      })
      .then(function (res) {
        if (res.data.data) {
          setRaids(res.data.data.reportData.reports.data);
        } else {
        }
      });
  };

  const value = {
    raids,
    setRaids,
    getFusion,
  };

  return <RaidContext.Provider value={value}>{children}</RaidContext.Provider>;
}
