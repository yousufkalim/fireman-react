import  React,{useRef,useEffect} from "react";
import {UpdateStore} from '../../../../StoreContext'
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const EstablishmentSearchData = ({ establishmentSearchData, setCompShow }) => {
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
 

  useEffect(() => {
    setTimeout(() => {
      if(establishmentSearchData){
        scrollToBottom()
      }
    }, 200);
   
  }, [establishmentSearchData])

  const updatestore = UpdateStore();
   const column = [ 
     { field: "ref", headerName: "Ref.", minWidth: 100, color: "#8D919D"},
   { field: "commune", headerName: "Commune", minWidth: 150, color: "#8D919D"},
   { field: "nom", headerName: "Nom", minWidth: 190, color: "#8D919D"},
   { field: "statut", headerName: "Statut", minWidth: 150, color: "#8D919D"},
   { field: "type", headerName: "Type", minWidth: 130, color: "#8D919D"},
   { field: "CAT", headerName: "CAT", minWidth: 130, color: "#8D919D"}
  ]
  const [sortModel, setSortModel] = React.useState([
    {
      field: 'commune',
      sort: 'asc',
    },
  ]);
const onRowClick =(data, event)=>{
  event.defaultMuiPrevented = true;
 updatestore({
   establishmentId:data.id,
   establishmentname:data.row.nom,
   activeCase:"newcase"
})
 localStorage.setItem("establishmentid", data.id);
    setCompShow("filestructure");
}
  return (
    <>
    <Item
     sx={{
      margin: "10px 0px",
      borderRadius: "10px",
      boxShadow:"none",
    }}
    > 
    <div style={{ height: "50vh", width: "100%" }}>
      <DataGrid
        sx={{border:"none"}}
      onCellClick={(params,event)=>onRowClick(params,event)}
      sortModel={sortModel}
      onSortModelChange={(model) => setSortModel(model)}
       columns={ column.map((val,index)=>({
        field: val.field,
        headerName: val.headerName,
        minWidth:val.minWidth,
        color: val.color
          })) } 
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
    <div ref={messagesEndRef} />
    </Item>
     
    </>
  );
};

export default EstablishmentSearchData;
