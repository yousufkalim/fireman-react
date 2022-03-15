// Init
import React, { useContext, useState, createContext } from "react";

// Initializing Create Context Hook
const storeContext = createContext();
const storeUpdateContext = createContext();

// We are also initializing useContexts here then we only call these functions where we need that data
export function Store() {
  return useContext(storeContext);
}

export function UpdateStore() {
  return useContext(storeUpdateContext);
}

// Initializing Store Provider
export function StoreProvider({ children }) {
  // Initializing State
  let [store, setStore] = useState({
    loggedIn: false,
    user: {},
    authorization: false,
    establishmentId:null,
    establishmentname:"",
    cityname:"",
    serialNum:"",
    activeNavbarTab:10,
    activeCase:"",
    caseFileId:"",
    sectionindex:"",
    chapterIndex:"",
    tabindex:"",
    buttonenable:false,
    caseName:"",
    catTab:false,
    phoneBook:false,
    phonebookData:null,
    connection:"",
    userId:"",
    role:""
  });

  const updateStore = (data) => {
    setStore((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  };

  // Render
  return (
    <storeContext.Provider value={store}>
      <storeUpdateContext.Provider value={updateStore}>
        {children}
      </storeUpdateContext.Provider>
    </storeContext.Provider>
  );
}
