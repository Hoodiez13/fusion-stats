import { Box } from "@mui/material";
import React from "react";

const FlexContainer = ({ children }) => {
  return (
    <Box style={{ display: "flex" }}>
      <div style={{ flex: 2 }}></div>
      <div style={{ flex: 8 }}>{children}</div>
      <div style={{ flex: 2 }}></div>
    </Box>
  );
};

export default FlexContainer;
