import React, { useState, useEffect } from "react";
import HistoricalSearch from "./HistoricalSearch";
import { Store } from "../../StoreContext";
import api from "../../api";

const EstablishmentSearchContainer = () => {
  const [generalDataEstablishment, setgeneralDataEstablishment] = useState([]); //////data passed to child
  const store = Store();
  console.log("store.establishmentId", store.establishmentId);

  useEffect(() => {
    api(
      "get",
      `/api/v1/get_generaldata_establishment/${store.establishmentId}`
    ).then((res) => {
      setgeneralDataEstablishment(res.data);
    });
  }, []);
  console.log("^^^^^^^^^^^^", generalDataEstablishment);
  return (
    <>
      <HistoricalSearch generalDataEstablishment={generalDataEstablishment} />
    </>
  );
};

export default EstablishmentSearchContainer;
