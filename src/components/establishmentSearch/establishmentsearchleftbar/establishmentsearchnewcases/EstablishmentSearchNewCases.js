import React, { useState } from "react";
import EstablishmentSearchNewCasesInputs from './EstablishmentSearchNewCasesInputs'
import FolderCreationSection from './FolderCreationSection'

const EstablishmentSearchNewCases = () => {
  const [compShow, setCompShow] = useState("newcases")
    return (
        <>  
      {
        compShow === "newcases"? (
          <EstablishmentSearchNewCasesInputs setCompShow={setCompShow}/>
        ):null
      }
    {compShow === "filestructure"? (
        <FolderCreationSection
        />
      ) : null}
        </>
    )
}

export default EstablishmentSearchNewCases
