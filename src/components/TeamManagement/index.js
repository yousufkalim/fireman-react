import profileImage from "../../assets/profile.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";
import api from "../../api/index";
import jwt from 'jwt-decode'
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import TeamManagmentForm from './TeamManagmentForm'
import { useTranslation, Trans } from "react-i18next";
import { UpdateStore, Store } from "../../StoreContext";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const TeamManagement = () => {
  const [child, setChild] = useState(true);
  let [importedData, setImportedData] = useState([]);
  let [prefilledData, setPrefilledData] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  const [usersData, setUsersData] = useState([]);
  const [CompName, setCompName] = useState("");
  const [inputsdata, setInputsdata] = useState([]);
  const [sortModel, setSortModel] = useState([
    {
      field: "commune",
      sort: "asc",
    },
  ]);
  useEffect(() => {
    var token = localStorage.getItem("userData");
    const userData = jwt(token);
    console.log("userData", userData);
    setChild(true);
    api("get", `/api/v1/Users/getAll/${userData.Id}`).then((res) => {
      console.log("res", res);
      setUsersData(res);
    });
  }, []);
  const column = [
    {
      field: "empFirstName",
      headerName: "Prénom",
      minWidth: 200,
      color: "#8D919D",
      borderBottom: "none",
    },
    {
      field: "empLastName",
      headerName: "Nom de famille",
      minWidth: 200,
      color: "#8D919D",
      borderBottom: "none",
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      color: "#8D919D",
      borderBottom: "none",
    },
    {
      field: "roleName",
      headerName: "La désignation",
      minWidth: 200,
      color: "#8D919D",
      borderBottom: "none",
    },
    {
      field: "serviceName",
      headerName: "Service",
      minWidth: 200,
      color: "#8D919D",
      borderBottom: "none",
    },
    {
      field: "groupName",
      headerName: "Groupe",
      minWidth: 130,
      color: "#8D919D",
      borderBottom: "none",
    },
    // {
    //   field: "deleteIcon",
    //   minWidth: 130,
    //   color: "#8D919D",
    //   borderBottom: "none",
    //   sortable: false,
    //   width: 140,
    //   disableClickEventBubbling: true,
    //   renderCell: (params) => {
    //     return (
    //       <div
    //         className="d-flex justify-content-between align-items-center"
    //         style={{ cursor: "pointer" }}
    //       >
    //         <MatEdit index={params.row.id} />
    //       </div>
    //     );
    //   },
    // },
  ];
  const updatestore = UpdateStore();
  const store = Store();
  const cellDoubleClick = (params, event) => {
    console.log("rafiaoutput", params.row.val);
    setChild(false);
    api("get", `/api/v1/Users/userDetails/${params.row.val.employeeId}`).then(
      (response) => {
        setImportedData(response);
      }
    );
    console.log("IMPORTED DATA ON DOUBLE CLICK", importedData);
    // updatestore({
    //     activeNavbarTab:"teammanage",
    //     teammanagmentid:params.row.val.employeeId
    // })
  };
  const callForm = () => {
    // updatestore({
    //     activeNavbarTab:"teammanagement"
    // })
    setChild(false);
    var loggedInUserDataID = localStorage.getItem("loggedInUser");
    console.log(
      "lOGGED IN USER ID BEING SAVED IN LOCAL STORAGE",
      loggedInUserDataID
    );
    api("get", `/api/v1/Users/userDetails/${loggedInUserDataID}`).then(
      (response) => {
        setPrefilledData(response);
      }
    );
  };
  console.log("PREFILLED DATA, on clicking create button", prefilledData);
  console.log("IMPORTED DATA, on clicking create button", importedData);
  return (
    <>
      {child ? (
        <>
          <div style={{ textAlign: "right", padding: "10px" }}>
            <Button
              type="submit"
              onClick={callForm}
              endIcon={<img className="icon-validate" />}
              sx={{
                background: "#3675B7",
                textAlign: "right",
                fontSize: "12.97px",
                ":hover": { background: "#3675B7" },
              }}
              variant="contained"
            >
              Nouvel utilisateur
            </Button>
          </div>
          <Item
            sx={{
              marginTop: "3px",
              borderRadius: "10px",
              boxShadow: "none",
            }}
          >
            <div style={{ height: "63vh", width: "100%" }}>
              <DataGrid
                sx={{ border: "none" }}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[25, 50, 100]}
                TablePagination
                labelRowsPerPage={"Lignes par page"}
                TablePagination
                pagination
                onCellDoubleClick={(params, event) =>
                  cellDoubleClick(params, event)
                }
                sortModel={sortModel}
                onSortModelChange={(model) => setSortModel(model)}
                columns={column.map((val, index) => ({
                  field: val.field,
                  headerName: val.headerName,
                  minWidth: val.minWidth,
                  borderBottom: val.borderBottom,
                }))}
                rows={usersData.data?.map((val, index) => ({
                  id: val.employeeId,
                  empFirstName: val.empFirstName,
                  empLastName: val.empLastName,
                  email: val.email,
                  roleName: val.roleName,
                  serviceName: val.serviceName,
                  groupName: val.groupName,
                  val: val,
                }))}
              />
            </div>
          </Item>
        </>
      ) : (
        <TeamManagmentForm
          importedData={importedData.data}
          prefilledData={prefilledData}
        />
      )}
    </>
  );
};

export default TeamManagement;
