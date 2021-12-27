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
import { DataGrid } from "@mui/x-data-grid";
const EstablishmentSearchData = ({ establishmentSearchData, setCompShow }) => {
  console.log(establishmentSearchData);
  const updatestore = UpdateStore();
    const store = Store()
  //might needed in future
  // const onClick = (id) => {
  //   console.log("",id);
  //   updatestore({establishmentId:id})
  //   localStorage.setItem("establishmentid", id);
  //   setCompShow("filestructure");
  //   console.log(store.establishmentId,"store");
  // };
   const column = [ 
     { field: "ref", headerName: "Ref.", width: 150 },
   { field: "commune", headerName: "Commune", width: 150 },
   { field: "nom", headerName: "Nom", width: 150 },
   { field: "statut", headerName: "Statut", width: 150 },
   { field: "type", headerName: "Type", width: 150 },
   { field: "CAT", headerName: "CAT", width: 150 }
  ]
  const [sortModel, setSortModel] = React.useState([
    {
      field: 'commune',
      sort: 'asc',
    },
  ]);
const onRowClick =(data, event)=>{
  event.defaultMuiPrevented = true;
console.log(data,"");
 updatestore({establishmentId:data.id})
 localStorage.setItem("establishmentid", data.id);
    setCompShow("filestructure");
}
  return (
    <>
      {/* 
      might be needed in future
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
      </TableContainer> */}

      <div style={{ height: "50vh", width: "100%" }}>
        
      <DataGrid
      onCellClick={(params,event)=>onRowClick(params,event)}
      sortModel={sortModel}
      onSortModelChange={(model) => setSortModel(model)}
       columns={column.map((val,index)=>({
        field: val.field,
        headerName: val.headerName
       }))} 
       rows={establishmentSearchData.data.map((val, index) => ({
        id: val.establishmentId,
         ref:val.referenceNo,
         commune:val.commune,
         nom:val.establishmentName,
         statut:val.status,
         type:val.classification,
         CAT:val.ranking,
        sortable: false,
      }))}
      
       />
    </div>
    </>
  );
};

export default EstablishmentSearchData;
