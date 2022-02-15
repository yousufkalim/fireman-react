import React,{useState,useEffect} from 'react';
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation, Trans } from "react-i18next";
import api from '../../../../api/index';
import moment from "moment";
const EndedCases = () => {
    const [endedcases, setendedcases] = useState([]);
    const [pageSize, setPageSize] = React.useState(25);
  useEffect(() => {
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId);
    api("get", `/api/v1/casefiles/rolewise_cases/${userId?.userid}/0`).then(
      (res) => {
        console.log(res);
        setendedcases(res);
      }
    );
  }, []);
     console.log(endedcases);
    const { t, i18n } = useTranslation();
    const [sortModel, setSortModel] = React.useState([
        {
          field: "commune",
          sort: "asc",
        },
      ]);

    const column = [
        {
          field: "typeref",
          headerName: "Type",
          color: "#8D919D",
        },
        { 
          field: "refNum", 
          headerName: `${t("REF #")}`, 
          minWidth: 100, 
          color: "#8D919D" },
        {
          field: "commisionName",
          headerName: "Commission",
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
          
          
      ];
      const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
      }));
  return (
      <>
       <Item
          sx={{
            marginTop: "3px",
            borderRadius: "10px",
            boxShadow: "none",
          }}
        >
          <div style={{ height: "71vh", width: "100%" }}>
            <DataGrid
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[25, 50, 100]}
             pagination
              sx={{ border: "none" }}
              sortModel={sortModel}
              onSortModelChange={(model) => setSortModel(model)}
              columns={column.map((val, index) => ({
                field: val.field,
                headerName: val.headerName,
                minWidth: val.minWidth,
              }))}
              rows={endedcases.data?.map((val, index) => ({
                id: val.caseFileId,
                typeref: val.caseTypeName,
                commisionName: val.commisionName,
                commisionDate: moment(val.commisionDate, "YYYY-MM-DD").format("DD-MM-YYYY"),
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
      </>
  )
};

export default EndedCases;
