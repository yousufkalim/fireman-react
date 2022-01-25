import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
const Loader = () => {
  return (
      <>
      <CircularProgress color="inherit" size={200} sx={{position:"absolute", top:"25%", height:"500px"}}/>
      </>
  )
};

export default Loader;
