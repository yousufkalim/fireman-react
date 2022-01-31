import React, { useState } from "react";
import OpenSearchNewCasesInputs from "./OpenSearchNewCasesInputs";
import FolderCreationSection from "./FolderCreationSection";
import {Store} from '../../../../StoreContext';
;

const EstablishmentSearchNewCases = () => {
  const [compShow, setCompShow] = useState("newcases");
  const store = Store()
  return (
    <>
      {compShow === "newcases" ? (
        <OpenSearchNewCasesInputs setCompShow={setCompShow} />
      ) : null}
      {compShow === "filestructure" || store.activeNavbarTab===0? <FolderCreationSection compShow={compShow}/> : null}
    </>
  );
};

export default EstablishmentSearchNewCases;
