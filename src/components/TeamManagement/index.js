import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../api/index";
import { UpdateStore, Store } from "../../StoreContext";
import TeamManagmentForm from "./TeamManagmentForm";
import jwt from "jwt-decode";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormControlLabel, IconButton } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import DeleteConfirmation from "../DeleteConfirmation";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const TeamManagement = ({TeamformDisplay,setTeamFormDisplay}) => {
  let [importedData, setImportedData] = useState([]);
  let [prefilledData, setPrefilledData] = useState([]);
  const [creation, setCreation] = useState(false)
  const [pageSize, setPageSize] = useState(25);
  const [usersData, setUsersData] = useState([]);
  const [userDelete, setUserDelete] = useState([]);
  const [sortModel, setSortModel] = useState([
    {
      field: "commune",
      sort: "asc",
    },
  ]);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    var token = localStorage.getItem("userData");
    const userData = jwt(token);
    console.log("userData", userData);
    setTeamFormDisplay(true);
    api("get", `/api/v1/Users/getAll/${userData.Id}`).then((res) => {
      console.log("res", res);
      setUsersData(res);
    });
  }, []);
  const MatEdit = ({ index }) => {
    const handleDeleteClick = () => {
      setOpen(true);
      //showDeleteModal(1012);
    };
    return (
      <FormControlLabel
        control={
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={handleDeleteClick}
          >
            <DeleteIcon style={{ color: red[500] }} />
          </IconButton>
        }
      />
    );
  };
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
    {
      field: "deleteIcon",
      headerName: "",
      sortable: false,
      width: 50,
      renderCell: (params) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <MatEdit index={params.row.id} />
          </div>
        );
      },
    },
  ];
  const store = Store();
  const cellClick = (params, event) => {
    api("get", `/api/v1/Users/userDetails/${params.row.val.employeeId}`).then(
      (response) => {
        setUserDelete(response);
      }
    );
  };
  const cellDoubleClick = (params, event) => {
    setTeamFormDisplay(false);
    setCreation(false)
    api("get", `/api/v1/Users/userDetails/${params.row.val.employeeId}`).then(
      (response) => {
        setImportedData(response);
      }
    );
  };
  const callForm = () => {
    setTeamFormDisplay(false);
    setImportedData([])
    var loggedInUserDataID = localStorage.getItem("loggedInUser");
    api("get", `/api/v1/Users/userDetails/${loggedInUserDataID}`).then(
      (response) => {
        console.log(response);
        setPrefilledData(response);
        setCreation(true)
      }
    );
  };
  return (
    <>
      {TeamformDisplay ? (
        <>
          <DeleteConfirmation
            setOpen={setOpen}
            open={open}
            userDelete={userDelete}
          />
          <div style={{ textAlign: "right", padding: "10px" }}>
            <button
              type="submit"
              onClick={callForm}
              endIcon={<img className="icon-validate" />}
              style={{
                display: "inline-flex",
                background: "#3675B7",
                color: "white",
                padding: "6px 16px",
                textAlign: "right",
                fontSize: "0.875rem",
                outline: "0",
                border: "0",
                margin: "0",
                lineHeight: "1.75",
                letterSpacing: "0.02857em",
                textTansform: "uppercase",
                minWidth: "64px",
                padding: "6px 16px",
                borderRadius: "4px",
                ":hover": { background: "#3675B7" },
              }}
              variant="contained"
            >
              Nouvel utilisateur
            </button>
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
                pagination
                onCellClick={(params, event) => cellClick(params, event)}
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
                  sortable: val.sortable,
                  width: val.width,
                  disableClickEventBubbling: val.disableClickEventBubbling,
                  renderCell: val.renderCell,
                }))}
                rows={
                  usersData?.data?.filter((val)=>(val?.roleSerial!=store?.role)).map((val,index)=>({
                      id: val.employeeId,
                  empFirstName: val.empFirstName,
                  empLastName: val.empLastName,
                  email: val.email,
                  roleName: val.roleName,
                  serviceName: val.serviceName,
                  groupName: val.groupName,
                  val: val,
                  }))
                }
              />
            </div>
          </Item>
        </>
      ) : (
        <TeamManagmentForm
          importedData={importedData.data}
          prefilledData={prefilledData}
          creation={creation}
          setTeamFormDisplay={setTeamFormDisplay}
        />
      )}
    </>
  );
};
export default TeamManagement;
