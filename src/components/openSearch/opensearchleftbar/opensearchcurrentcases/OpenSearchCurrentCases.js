import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import api from "../../../../api/index";
import { UpdateStore } from "../../../../StoreContext";
import FolderCreationSection from "../opensearchnewcases/FolderCreationSection";
const EstablishmentSearchCurrentCases = ({ currentcasesData }) => {
  const [folderCreationData, setFolderCreationData] = useState([]);
  const [Studydata, setStudydata] = useState([]);
  const [indexdata, setIndexdata] = useState({
    sectionindex: "",
    tabindex: "",
  });
  const [CompName, setCompName] = useState("");
  const [sortModel, setSortModel] = React.useState([
    {
      field: 'commune',
      sort: 'asc',
    },
  ]);

  const updatestore = UpdateStore();
  const column = [ 
    { field: "typeref", headerName: "typeref.", minWidth: 100, color: "#8D919D"},
  { field: "caseaveragename", headerName: "caseaveragename", minWidth: 180, color: "#8D919D"},
  { field: "commisionDate", headerName: "commisionDate", minWidth: 190, color: "#8D919D"},
  { field: "createdAt", headerName: "createdAt", minWidth: 150, color: "#8D919D"},
  { field: "employeename", headerName: "employeename", minWidth: 130, color: "#8D919D"},
  { field: "refnum", headerName: "refnum", minWidth: 130, color: "#8D919D"}
 ]

 console.log("currentcasesData",currentcasesData);
  const onRowClick = (params,events) => {
    console.log("params",params.row.val.establishmentId, params.row.val.caseFileId, params.row.val.sectionIndex,params.row.val.tabIndex);
    //console.log("events", events);
    setCompName("currentcases")
    if (params.row.val.sectionIndex === 2 && params.row.val.tabIndex === 1) {
      updatestore({
        activeNavbarTab: 1,
        establishmentId: params.row.val.establishmentId,
        activeCase: "currentcases",
      });
    }
    setIndexdata(() => {
      return {
        sectionindex: params.row.val.sectionIndex,
        tabindex: params.row.val.tabIndex,
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
      boxShadow:"none"
    }}
    >  
        <div style={{ height: "50vh", width: "100%" }}>
        
        <DataGrid
         sx={{border:"none"}}
        onCellClick={(params,event)=>onRowClick(params,event)}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
         columns={column.map((val,index)=>({
          field: val.field,
          headerName: val.headerName,
          minWidth:val.minWidth,
         }))} 
         rows={currentcasesData.data?.map((val, index) => ({
          id: val.caseFileId,
           typeref:val.caseTypeName,
           caseaveragename:val.caseAverageName,
           commisionDate:val.commisionDate,
           createdAt:val.createdAt,
           employeename:val.employeeName,
           refnum:val.refNum,
           sectionindex: val.sectionIndex,
           tabindex:val.tabIndex,
           val:val
        }))}
        
         />
      </div>
     </Item>
      )}
      {/* <div style={{ height: "50vh", width: "100%" }}>
        
        <DataGrid
        onCellClick={(params,event)=>onRowClick(params,event)}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
         columns={column.map((val,index)=>({
          field: val.field,
          headerName: val.headerName
         }))} 
         rows={currentcasesData.data?.map((val, index) => ({
          id: val.caseFileId,
           typeref:val.caseTypeName,
           caseaveragename:val.caseAverageName,
           commisionDate:val.commisionDate,
           createdAt:val.createdAt,
           employeename:val.employeeName,
           refnum:val.refNum,
           sectionindex: val.sectionIndex,
           tabindex:val.tabIndex,
        }))}
        
         />
      </div> */}
    </>
  );
};

export default EstablishmentSearchCurrentCases;
