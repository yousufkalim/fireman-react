import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../../../api/index";
import { Store, UpdateStore } from "../../../../StoreContext";
import FolderCreationContainer from "../opensearchnewcases/FolderCreationContainer";
import { useTranslation } from "react-i18next";
import moment from "moment";
import Button from "@mui/material/Button";
import { FormControlLabel } from "@material-ui/core";
import CloudDoneSharpIcon from "@mui/icons-material/CloudDoneSharp";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import { useDemoData } from "@mui/x-data-grid-generator";
import scrollStyles from '../../../../components/ScrollBarStyle'

const EstablishmentSearchCurrentCases = ({setCompName,CompName}) => {
  const [folderCreationData, setFolderCreationData] = useState([]);
  const [currentcasesData, setcurrentcasesData] = useState([]);
  const [indexdata, setIndexdata] = useState({
    sectionindex: "",
    tabindex: "",
    establishmentId: "",
  });
  const { data } = useDemoData({
    labelRowsPerPage: "Lignes par page",
  });
  const classes = scrollStyles();
  
  const [pageSize, setPageSize] = React.useState(25);
  const store = Store();
  let userId = localStorage.getItem("userData");
  userId = JSON.parse(userId);
  useEffect(() => {
    getCurrentCasesData()
  }, []);

  const { t, i18n } = useTranslation();
  // const [CompName, setCompName] = useState("");
  const [sortModel, setSortModel] = React.useState([
    {
      field: "commune",
      sort: "asc",
    },
  ]);
  const updatestore = UpdateStore();
  const getCurrentCasesData = ()=>{
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId);
    api(
      "get",
      `/api/v1/casefiles/rolewise_cases/${store?.role}/${userId?.userid}/1`
    ).then((res) => {
      setcurrentcasesData(res);
    });
  }
  const MatEdit = ({ text,params }) => {
    return (
      <>
      {
        // (params?.row?.val?.state== "EN COURS" && (store.role=="1" || store.role=="2" || store.role=="3"))
        // || 
        (params?.row?.val?.state=="TERMINÉ Non Valide" && (store.role=="4"||store.role=="5"))
        ?
        ""
        :
        <FormControlLabel
        control={
          <Button
            onClick={() => {
              if(!params?.row?.val?.chapterIndex){
                toast.error("L'onglet Overture and Establishment est incomplet")
              }
              if(params?.row?.val?.chapterIndex){
                if(text=="Valider"){
                  api(
                    "put",
                    `/api/v1/casefiles/validatecasefile/${params?.row?.val?.caseFileId}`
                  )
                    .then((res) => {
                      if (res?.data === true) {
                        toast.success(t("Successfull"));
                        getCurrentCasesData();
                      } else {
                        toast.error("Le dossier n'est pas complet");
                      }
                    })
                    .catch((err) => {
                      toast.error("error");
                    });
                }
                if(text=="Terminé"){
                  api(
                    "put",
                    `/api/v1/casefiles/complete_casefile/${params?.row?.val?.caseFileId}`
                  )
                    .then((res) => {
                      if (res?.data === true) {
                        toast.success(t("Successfull"));
                        getCurrentCasesData();
                      } else {
                        toast.error("Le dossier n'est pas complet");
                      }
                    })
                    .catch((err) => {
                      toast.error("error");
                    });
                }
              }
              

            }}
            variant="contained"
            endIcon={<CloudDoneSharpIcon />}
          >
            {text}
          </Button>
        }
      />
      }
      </>
    );
  };

  const column = [
    {
      field: "typeref",
      headerName: "Type",
      minWidth: 250,
      color: "#8D919D",
      borderBottom: "none",
    },
    {
      field: "refNum",
      headerName: `${t("REF #")}`,
      minWidth: 100,
      color: "#8D919D",
      borderBottom: "none",
    },
    {
      field: "commisionName",
      headerName: "Commission",
      minWidth: 150,
      color: "#8D919D",
      borderBottom: "none",
    },
    {
      field: "commisionDate",
      headerName: "Date COM.",
      minWidth: 150,
      color: "#8D919D",
      borderBottom: "none",
    },
    {
      field: "establishmentName",
      headerName: `${t("Name Of Establishment Ref")}`,
      minWidth: 220,
      color: "#8D919D",
      borderBottom: "none",
    },
    {
      field: "ref",
      headerName: `${t("Ref#")}`,
      minWidth: 150,
      color: "#8D919D",
      borderBottom: "none",
    },
    {
      field: "cityName",
      headerName: `${t("City")}`,
      minWidth: 180,
      color: "#8D919D",
      borderBottom: "none",
    },

    {
      field: "state",
      headerName: `${t("State")}`,
      minWidth: 220,
      color: "#8D919D",
      borderBottom: "none",
    },
    {
      field: "Validate",
      headerName: "",
      sortable: false,
      minWidth: store.role==1 || store.role==2 || store.role==3? 140 : 0,
      renderCell: store.role==1 || store.role==2 || store.role==3? ( (params) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <MatEdit text={"Valider"} params={params} />
          </div>
        );
      }):"",
    },
    {
      field: "Completed",
      headerName: "",
      sortable: false,
      minWidth: store.role==1 || store.role==2 || store.role==3|| store.role==4 || store.role==5? 140 : 0,
      renderCell: (params) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <MatEdit text={"Terminé"} params={params} />
          </div>
        );
      },
    },

  ];
  const onRowClick = (params) => {
    updatestore({
      establishmentId: params.row.val.establishmentId,
      caseFileId: params.row.val.caseFileId,
      activeCase: "currentcases",
      sectionindex: params.row.val.sectionIndex,
      tabindex: params.row.val.tabIndex,
      chapterIndex: params.row.val.chapterIndex,
      catTab: true,
      caseName: params.row.val?.studyCaseName
        ? params.row.val?.studyCaseName
        : params.row.val?.visitTypeName,
      establishmentname: params?.row?.val?.establishmentName,
      cityname: params?.row?.val?.cityName,
      serialNum: params?.row?.val?.serialNum,
    });
    setCompName("currentcases");
    
      if (
        (params.row.val.tabIndex === 1 && params.row.val.sectionIndex === 3) ||
        params.row.val.tabIndex === 2
      ) {
        updatestore({
          activeNavbarTab: 1,
          establishmentId: params.row.val.establishmentId,
        });
      }
      if (
        (params.row.val.tabIndex === 2 && params.row.val.sectionIndex === 5) ||
        params.row.val.tabIndex === 3
      ) {
        updatestore({
          activeNavbarTab: 2,
          establishmentId: params.row.val.establishmentId,
        });
      }
    setIndexdata(() => {
      return {
        sectionindex: params.row.val.sectionIndex,
        tabindex: params.row.val.tabIndex,
        establishmentId: params.row.val.establishmentId,
      };
    });
    api(
      "get",
      `/api/v1/casefiles/get_open_foldercreation/${params.row.val.establishmentId}/${params.row.val.caseFileId}`
    ).then((res) => {
      setFolderCreationData(res?.data);
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
      {folderCreationData.length !== 0 && CompName=="currentcases"? (
        <FolderCreationContainer
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
            marginTop: "3px",
            borderRadius: "10px",
            boxShadow: "none",
          }}
        >
          <Box sx={{ 
            '& .super-app-theme--open': {
              bgcolor: "#3675B7",
              '&:hover': "blue"
            },
            height: "71vh", width: "100%" 
            
            }}>
            <DataGrid
               getRowClassName={(params) => params.row.state=="TERMINÉ Non Valide"? "super-app-theme--open":"" }
              className={classes.root}
              sx={{ border: "none" }}
              {...data}
              pageSize={pageSize}
              componentsProps={{
                pagination: {
                  component: "div", // here
                  labelRowsPerPage: "Lignes par page",
                },
              }}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[25, 50, 100]}
              pagination
              onCellDoubleClick={(params, event) => onRowClick(params, event)}
              sortModel={sortModel}
              onSortModelChange={(model) => setSortModel(model)}
              columns={column.map((val, index) => ({
                field: val?.field,
                headerName: val?.headerName,
                minWidth: val?.minWidth,
                borderBottom: val?.borderBottom,
                renderCell: val?.renderCell,
              }))}
              rows={currentcasesData.data?.map((val, index) => ({
               
                id: val?.caseFileId,
                typeref: `${val?.caseTypeName}`,
                commisionName: val?.commisionName,
                commisionDate: moment(val?.commisionDate, "YYYY-MM-DD").format(
                  "DD-MM-YYYY"
                ),
                establishmentName: val?.establishmentName,
                refNum: val?.refNum,
                ref: val?.establishmentNumber,
                cityName: val?.cityName,
                state: val?.state,
                sectionindex: val?.sectionIndex,
                tabindex: val?.tabIndex,
                val: val,
              }))}
            />
          </Box>
        </Item>
      )}
    </>
  );
};

export default EstablishmentSearchCurrentCases;
