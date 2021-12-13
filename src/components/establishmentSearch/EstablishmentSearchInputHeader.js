import React from "react";
import Box from "@mui/material/Box";
const EstablishmentSearchInputHeader = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid gray",
          padding: "10px",
        }}
      >
        <h5>Documents durbanisme rattaches</h5>
        <span className="inputs-heading-text"> Reduire</span>
      </Box>
    </>
  );
};

export default EstablishmentSearchInputHeader;
