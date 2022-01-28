import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../../../api/index";
import { UpdateStore } from "../../../../StoreContext";
import FolderCreationSection from "../opensearchnewcases/FolderCreationSection";
import { useTranslation, Trans } from "react-i18next";
const EstablishmentSearchCurrentCases = ({ currentcasesData }) => {
  const [folderCreationData, setFolderCreationData] = useState([]);
  const [Studydata, setStudydata] = useState([]);
  const [indexdata, setIndexdata] = useState({
    sectionindex: "",
    tabindex: "",
    establishmentId:""
  });
  const { t, i18n } = useTranslation();
  const [CompName, setCompName] = useState("");
  const [sortModel, setSortModel] = React.useState([
    {
      field: "commune",
      sort: "asc",
    },
  ]);
  const updatestore = UpdateStore();
  const column = [
    {
      field: "typeref",
      headerName: "Type Ref",
      minWidth: 120,
      color: "#8D919D",
    },
    {
      field: "commisionName",
      headerName: "Commision",
      minWidth: 150,
      color: "#8D919D",
    },
    {
      field: "commisionDate",
      headerName: "Date COM.",
      minWidth: 150,
      color: "#8D919D",
    },
    {
      field: "establishmentName",
      headerName: `${t("Name Of Establishment Ref")}`,
      minWidth: 220,
      color: "#8D919D",
    },
    {
      field: "cityName",
      headerName: `${t("City")}`,
      minWidth: 130,
      color: "#8D919D",
    },
    { 
      field: "state", 
      headerName: `${t("State")}`, 
      minWidth: 100, 
      color: "#8D919D" },
      { 
        field: "refNum", 
        headerName: `${t("refNum")}`, 
        minWidth: 100, 
        color: "#8D919D" },
      
  ];
  const onRowClick = (params) => {
    setCompName("currentcases");
    if (params.row.val.tabIndex === 2) {
      updatestore({
        // activeNavbarTab: 1,
        establishmentId: params.row.val.establishmentId,
        activeCase: "currentcases",
      });
    }
    setIndexdata(() => {
      return {
        sectionindex: params.row.val.sectionIndex,
        tabindex: params.row.val.tabIndex,
        establishmentId: params.row.val.establishmentId
      };
    });
    api(
      "get",
      `/api/v1/casefiles/get_open_foldercreation/${params.row.val.establishmentId}/${params.row.val.caseFileId}`
    ).then((res) => {
      setFolderCreationData(res?.data);
    });
    api(
      "get",
      `/api/v1/casefiles/get_open_townplanning/${params.row.val.establishmentId}/${params.row.val.caseFileId}`
    ).then((res) => {
      setStudydata(res);
    });
  };
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      {folderCreationData.length !== 0 ? (
        <FolderCreationSection
          CompName={CompName}
          indexdata={indexdata}
          currentcasescaseFileId={folderCreationData.caseFileId}
          currentcasescaseTypeId={folderCreationData.caseTypeId}
          currentcasescommisionTypeId={folderCreationData.commisionTypeId}
          currentcasesstudyTypeId={folderCreationData.studyTypeId}
          currentcasesvisitTypeId={folderCreationData.visitTypeId}
          currentcasescommisionDate={folderCreationData.commisionDate}
          Studydata={Studydata}
        />
      ) : (
        <Item
          sx={{
            marginTop: "10px",
            borderRadius: "10px",
            boxShadow: "none",
          }}
        >
          <div style={{ height: "71vh", width: "100%" }}>
            <DataGrid
              sx={{ border: "none" }}
              onCellClick={(params, event) => onRowClick(params, event)}
              sortModel={sortModel}
              onSortModelChange={(model) => setSortModel(model)}
              columns={column.map((val, index) => ({
                field: val.field,
                headerName: val.headerName,
                minWidth: val.minWidth,
              }))}
              rows={currentcasesData.data?.map((val, index) => ({
                id: val.caseFileId,
                typeref: val.caseTypeName,
                commisionName: val.commisionName,
                commisionDate: val.commisionDate,
                establishmentName: val.establishmentName,
                cityName: val.cityName,
                state: val.state,
                sectionindex: val.sectionIndex,
                tabindex: val.tabIndex,
                refNum:val.refNum,
                val: val,
              }))}
            />
          </div>
        </Item>
      )}
    </>
  );
};

export default EstablishmentSearchCurrentCases;
