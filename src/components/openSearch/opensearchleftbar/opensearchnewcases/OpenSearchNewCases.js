import React, { useState } from "react";
import OpenSearchNewCasesInputs from "./OpenSearchNewCasesInputs";
import FolderCreationSection from "./FolderCreationSection";

const EstablishmentSearchNewCases = () => {
  const [compShow, setCompShow] = useState("newcases");
  return (
    <>
      {compShow === "newcases" ? (
        <OpenSearchNewCasesInputs setCompShow={setCompShow} />
      ) : null}
      {compShow === "filestructure" ? <FolderCreationSection compShow={compShow}/> : null}
    </>
  );
};

export default EstablishmentSearchNewCases;
