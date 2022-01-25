import React from 'react';
import EditModal from "../Modals/EditCheckBox"
const Subchecklist = ({
    subcheckData,
    setOpen={setOpen}, 
    open={open}, 
    handleClose={handleClose}
}) => {
    console.log("subcheckData>>>>",subcheckData);
  return (

  <>
  {/* {
    subcheckData.map((val)=>(
        <EditModal 
   accordionData={}
   saveChanges={saveChanges} 
   accordionData={checklistdata} 
   setOpen={setOpen} 
   open={open} 
   handleClose={handleClose} 
   />
    ))
  } */}
  
  </>
  
  );
};

export default Subchecklist;
