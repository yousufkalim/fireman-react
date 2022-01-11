import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
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
  const updatestore = UpdateStore();
  const onClick = (establishmentid, id, sectionIndex, tabIndex) => {
    if (sectionIndex === 2 && tabIndex === 1) {
      updatestore({
        activeNavbarTab: 1,
        establishmentId: establishmentid,
        activeCase: "currentcases",
      });
    }
    setIndexdata(() => {
      return {
        sectionindex: sectionIndex,
        tabindex: tabIndex,
      };
    });
    api(
      "get",
      `/api/v1/casefiles/get_open_foldercreation/${establishmentid}/${id}`
    ).then((res) => {
      setFolderCreationData(res?.data);
    });
    api(
      "get",
      `/api/v1/casefiles/get_open_townplanning/${establishmentid}/${id}`
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
            marginTop: "5px",
            borderLeft: "10px solid cadetblue",
            borderRadius: "10px",
          }}
        >
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <span>Type</span> <br /> <span>Ref</span>{" "}
                  </TableCell>
                  <TableCell align="left">caseAverageName</TableCell>
                  <TableCell align="left">commisionDate&nbsp;</TableCell>
                  <TableCell align="left">createdAt&nbsp;</TableCell>
                  <TableCell align="left">employeeName&nbsp;</TableCell>
                  <TableCell align="left">refNum&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentcasesData.data?.map((row, i) => (
                  <TableRow
                    onClick={() =>
                      onClick(
                        row.establishmentId,
                        row.caseFileId,
                        row.sectionIndex,
                        row.tabIndex,
                        setCompName("currentcases")
                      )
                    }
                    id={row.caseFileId}
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <span> {row.caseTypeName} </span> <br />{" "}
                      <span>{row.refNum}</span>
                    </TableCell>
                    <TableCell align="left"> {row.caseAverageName} </TableCell>
                    <TableCell align="left">{row.commisionDate}</TableCell>
                    <TableCell align="left">{row.createdAt}</TableCell>
                    <TableCell align="left">{row.employeeName}</TableCell>
                    <TableCell align="left">{row.refNum}</TableCell>
                    <TableCell align="left">{row.state}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
