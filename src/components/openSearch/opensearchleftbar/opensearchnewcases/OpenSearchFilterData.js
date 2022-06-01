import  React,{useRef,useEffect} from "react";
import {UpdateStore,Store} from '../../../../StoreContext'
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import api from "../../../../api/index";
import scrollStyles from '../../../../components/ScrollBarStyle'
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const EstablishmentSearchData = ({ establishmentSearchData, setCompShow,setPhoneBookDisplay }) => {
  const { t } = useTranslation();
  const classes = scrollStyles();
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  const store = Store()


  useEffect(() => {
    setTimeout(() => {
      if(establishmentSearchData){
        scrollToBottom()
      }
    }, 200);
   
  }, [establishmentSearchData])

  const updatestore = UpdateStore();
   const column = [ 
     { field: "ref", headerName: `${t("Ref.")}`, minWidth: 100, color: "#8D919D"},
   { field: "commune", headerName: `${t("City")}`, minWidth: 200, color: "#8D919D"},
   { field: "nom", headerName: `${t("Name")}`, minWidth: 200, color: "#8D919D"},
   { field: "Ref", headerName: `${t("Etab. Ref")}`, minWidth: 200, color: "#8D919D"},
   { field: "address", headerName: `${t("Address")}`, minWidth: 250, color: "#8D919D"},
   { field: "statut", headerName: `${t("Status")}`, minWidth: 160, color: "#8D919D"},
   { field: "type", headerName: "Type", minWidth: 140, color: "#8D919D"},
   { field: "CAT", headerName: "CAT", minWidth: 140, color: "#8D919D"},
  ]
  const [sortModel, setSortModel] = React.useState([
    {
      field: 'commune',
      sort: 'asc',
    },
  ]);
const onRowClick =(data, event)=>{
  event.defaultMuiPrevented = true;
  if(store?.phoneBook){
    api("get", `/api/v1/get_establishment_phonebook/${data.id}`).then((res) => {
      updatestore({
        phonebookData:{...res.data,name:data.row.nom}
     })
      setCompShow("phoneBook");
    });
    
  }else{
    updatestore({
      establishmentId:data.id,
      establishmentname:data.row.nom,
      activeCase:"newcase",
      catTab:true
   })
    localStorage.setItem("establishmentid", data.id);
       setCompShow("filestructure");
     
  }

}
  return (
    <>
    <Item
     sx={{
      margin: "1% auto",
      borderRadius: "10px",
      boxShadow:"none",
      width:"98%"
    }}
    > 
    <div style={{ height: "50vh", width: "100%" }}>
      <DataGrid
      className={classes.root}
        sx={{
          border:"none",
        }}
      onCellClick={(params,event)=>onRowClick(params,event)}
      sortModel={sortModel}
      TablePagination
      labelRowsPerPage={"Lignes par page"}
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
         Ref:val.etabNo,
         address:val.address,
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
