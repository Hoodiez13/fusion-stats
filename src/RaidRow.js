import { useTheme } from "@emotion/react";
import { BorderAll, Padding } from "@mui/icons-material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const RaidRow = ({ raid }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      style={{
        padding: "8px",
        border: "1px solid #444",
        backgroundColor: isHovered
          ? theme.palette.background.hover
          : theme.palette.background.default,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <NavLink
        to={"/raiddetails/" + raid.code}
        style={{ textDecoration: "none", color: "#fff" }}
      >
        <div style={{ display: "flex", width: "100%" }}>
          <div>
            <img src={`/media/${raid.zone.name}.jpg`} />
          </div>
          <div style={{ flex: 1 }}>{`${raid.title ? raid.title : "N/A"}`}</div>
          <div style={{ flex: 1 }}>{`Zone: ${
            raid.zone ? raid.zone.name : "N/A"
          }`}</div>
          <div style={{ flex: 1 }}>{`Owner: ${
            raid.owner ? raid.owner.name : "N/A"
          }`}</div>
        </div>
      </NavLink>
    </div>
  );
};

export default RaidRow;
