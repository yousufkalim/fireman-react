import React from 'react';
import FolderCreationSection from './FolderCreationSection';
import { Store } from '../../../../StoreContext';
import { UpdateStore } from "../../../../StoreContext";


const FolderCreationContainer = ({
    CompName,
    indexdata,
    currentcasescaseFileId,
    currentcasescaseTypeId,
    currentcasescommisionTypeId,
    currentcasesstudyTypeId,
    currentcasesvisitTypeId,
    currentcasescommisionDate,
    Studydata
}) => {
    const store= Store();
    console.log("rerendered",store);
    const updatestore = UpdateStore();
    
  return (
  
  <>
  <FolderCreationSection
   CompName={CompName}
   indexdata={indexdata}
   currentcasescaseFileId={currentcasescaseFileId}
   currentcasescaseTypeId={currentcasescaseTypeId}
   currentcasescommisionTypeId={currentcasescommisionTypeId}
   currentcasesstudyTypeId={currentcasesstudyTypeId}
   currentcasesvisitTypeId={currentcasesvisitTypeId}
   currentcasescommisionDate={currentcasescommisionDate}
   Studydata={Studydata}
   Storey={store}
  />
  
  </>
  
  );
};

export default FolderCreationContainer;
