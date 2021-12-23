import React, { useState } from "react";
import Box from "@mui/material/Box";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import api from "../api/index";
import { useEffect } from "react";

const EstablishmentSearchLeftBar = ({ setActiveSearch, getResponse }) => {
  const [active, setActive] = useState("newcases");
  const items = [
    {
      id: "currentcases",
      text: "Current Cases",
      icon: <AccessibilityIcon />,
    },
    {
      id: "newcases",
      text: "New Cases",
      icon: <AccessibilityIcon />,
    },
    {
      text: "ossieres realises",
      icon: <AccessibilityIcon />,
    },
    {
      text: "Annuaire",
      icon: <AccessibilityIcon />,
    },
  ];
  useEffect(() => {
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId);
    api("get", `/api/v1/casefiles/rolewise_cases/${userId?.userid}`).then(
      (res) => {
        getResponse(res);
      }
    );
  }, []);
  // const getCurrentCases = (e) => {
  //   const name = e.target.id;
  //   alert(name)
  //   setActiveSearch(name);
  // };
  const onClick = (e) => {
    setActive(e);
    setActiveSearch(e);
  };
  return (
    <>
      {items.map((item, i) => {
        const className = active === item.id ? "active" : "";
        return (
          <Box
            className={`unactive leftbar-icon-text ${className}`}
             onClick = {()=>onClick(item.id)}
            sx={{ margin: "10px 0px" }}
          >
            <div>
              {item.icon}
              <span id={item.id} >
                {item.text}
              </span>
            </div>
          </Box>
        );
      })}
    </>
  );
};

export default EstablishmentSearchLeftBar;
