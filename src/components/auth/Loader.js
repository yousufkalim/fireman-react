import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
const Loader = () => {
  return (
      <>
      <CircularProgress color="inherit" size={50} sx={{position:"absolute", top:"52%", left:"65%", height:"500px"}}/>
      </>
  )
};

export default Loader;
