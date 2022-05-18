import React from 'react'
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
const TooltipComp = ({title,icon,delay}) => {
  return (
    <>
     <Tooltip enterDelay={delay} title={title}>
                <IconButton>
                {icon}
                </IconButton>
              </Tooltip>
    </>
  )
}

export default TooltipComp