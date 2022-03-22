import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles({
  root: {
    "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
      outline: "none",
    },
  },
});
const EstablishmentSearchCurrentCases = () => {
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
  const classes = useStyles();

  const [pageSize, setPageSize] = React.useState(25);
  const store = Store();
  console.log("!!!!!!!!!", store.role);
  useEffect(() => {
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId);
    api(
      "get",
      `/api/v1/casefiles/rolewise_cases/${store?.role}/${userId?.userid}/1`
    ).then((res) => {
      setcurrentcasesData(res);
    });
  }, []);
  console.log("!!!!!!!!!2", currentcasesData);

  const { t, i18n } = useTranslation();
  const [CompName, setCompName] = useState("");
  const [sortModel, setSortModel] = React.useState([
    {
      field: "commune",
      sort: "asc",
    },
  ]);
  const updatestore = UpdateStore();
  const MatEdit = ({ params }) => {
    return (
      <FormControlLabel
        control={
          <Button
            onClick={() => {
              api(
                "put",
                `/api/v1/casefiles/validatecasefile/${params?.row?.val?.caseFileId}`
              )
                .then((res) => {
                  console.log(res, "validate");

                  if (res.data === true) {
                    toast.success(t("Successfull"));
                  } else {
                    toast.error("Le dossier n'est pas complet");
                  }
                })
                .catch((err) => {
                  toast.error("error");
                });
            }}
            variant="contained"
            endIcon={<CloudDoneSharpIcon />}
          >
            Valider
          </Button>
        }
      />
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
      field: "Refnum",
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
      minWidth: 150,
      color: "#8D919D",
      borderBottom: "none",
    },
    {
      field: "Validate",
      headerName: "",
      sortable: false,
      minWidth: 140,
      renderCell: (params) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <MatEdit params={params} />
          </div>
        );
      },
    },
  ];

  const onRowClick = (params) => {
    console.log(params.row.val);
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
    if (params.row.val.tabIndex === 2 && params.row.val.sectionIndex === 5) {
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
  console.log(">>>>>>", currentcasesData);
  return (
    <>
      {folderCreationData.length !== 0 ? (
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
          <Box sx={{ height: "71vh", width: "100%" }}>
            <DataGrid
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
                field: val.field,
                headerName: val.headerName,
                minWidth: val.minWidth,
                borderBottom: val.borderBottom,
                renderCell: val.renderCell,
              }))}
              rows={currentcasesData.data?.map((val, index) => ({
                id: val.caseFileId,
                typeref: `${val.caseTypeName}`,
                commisionName: val.commisionName,
                commisionDate: moment(val.commisionDate, "YYYY-MM-DD").format(
                  "DD-MM-YYYY"
                ),
                establishmentName: val.establishmentName,
                //Refnum: val.ref,
                cityName: val.cityName,
                state: val.state,
                sectionindex: val.sectionIndex,
                tabindex: val.tabIndex,
                refNum: val.refNum,
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
