import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import api from "../../../../api/index";
import FolderCreationSection from "../opensearchnewcases/FolderCreationSection";
const EstablishmentSearchCurrentCases = ({ currentcasesData }) => {
  const [folderCreationData, setFolderCreationData] = useState([]);
  const [indexdata, setIndexdata] = useState({
    sectionindex: "",
    tabindex: "",
  });
  const [CompName, setCompName] = useState("");
  const onClick = (id, sectionIndex, tabIndex) => {
    console.log(id, sectionIndex, tabIndex);
    setIndexdata(() => {
      return {
        sectionindex: sectionIndex,
        tabindex: tabIndex,
      };
    });
    api("get", `/api/v1/casefiles/get_open_foldercreation/${id}`).then(
      (res) => {
        console.log("res", res);
        setFolderCreationData(res?.data);
      }
    );
  };

  console.log("currentcasesData", currentcasesData);
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
                  <TableCell>CaseTypeName</TableCell>
                  <TableCell align="right">caseAverageName</TableCell>
                  <TableCell align="right">commisionDate&nbsp;</TableCell>
                  <TableCell align="right">createdAt&nbsp;</TableCell>
                  <TableCell align="right">employeeName&nbsp;</TableCell>
                  <TableCell align="right">refNum&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentcasesData.data?.map((row, i) => (
                  <TableRow
                    onClick={() =>
                      onClick(
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
                      {row.caseTypeName}
                    </TableCell>
                    <TableCell align="right">{row.caseAverageName}</TableCell>
                    <TableCell align="right">{row.commisionDate}</TableCell>
                    <TableCell align="right">{row.createdAt}</TableCell>
                    <TableCell align="right">{row.employeeName}</TableCell>
                    <TableCell align="right">{row.refNum}</TableCell>
                    <TableCell align="right">{row.state}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Item>
      )}
    </>
  );
};

export default EstablishmentSearchCurrentCases;
