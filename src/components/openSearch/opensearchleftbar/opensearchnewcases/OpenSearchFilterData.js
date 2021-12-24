import  React,{useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {UpdateStore} from '../../../../StoreContext'
import {Store} from '../../../../StoreContext'
const EstablishmentSearchData = ({ establishmentSearchData, setCompShow }) => {
  
  const updatestore = UpdateStore();
    const store = Store()
  const onClick = (id) => {
    updatestore({establishmentId:id})
    localStorage.setItem("establishmentid", id);
    setCompShow("filestructure");
    console.log(store.establishmentId,"store");
  };
  

  
  return (
    <>
      <TableContainer sx={{ marginTop: "10px" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
            <TableCell align="left">Ref.</TableCell>
            <TableCell align="left">Commune</TableCell>
            <TableCell align="left">Nom</TableCell>
            <TableCell align="left">Statut</TableCell>
              <TableCell>Type</TableCell>

             

              <TableCell align="left">CAT</TableCell>
              
             
            </TableRow>
          </TableHead>
          <TableBody>
            {establishmentSearchData.data?.map((row, i) => (
              <TableRow
                onClick={() => onClick(row.establishmentId)}
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                
                <TableCell align="left">{row.referenceNo}</TableCell>
                <TableCell align="left">{row.commune}</TableCell>
                <TableCell align="left">{row.establishmentName}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
                <TableCell component="th" scope="row">
                  {row.classification}
                </TableCell>
                <TableCell align="left">{row.ranking}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EstablishmentSearchData;
