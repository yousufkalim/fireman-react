import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import api from "../api";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { fontSize, fontWeight } from "@mui/system";

const DeleteConfirmation = ({ setOpen, open, userDelete }) => {
  const handleClose = (deleteUser) => {
    if (deleteUser == true) {
      alert("delete api called");
      api(
        "delete",
        `/api/v1/Users/delete_user/${userDelete?.data?.employeeId}`
      ).then((res) => {
        ///api/v1/Users/delete_user/{userId}
        console.log("DELETE USER API res", res);
        toast.success("User Deleted");
        //setUsersData(res);
      });
      //alert(userDelete);
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        //sx={{ width: "100%" }}
      >
        {/* <PriorityHighIcon /> */}
        <DialogTitle
          sx={{ fontSize: "20px !important", fontWeight: "bold !important" }}
        >
          Voulez-vous vraiment supprimer cet utilisateur?
        </DialogTitle>
        <DialogActions>
          <button
            onClick={handleClose}
            style={{
              display: "inline-flex",
              background: "#9fa5ab",
              color: "white",
              padding: "6px 16px",
              textAlign: "right",
              fontSize: "0.875rem",
              outline: "0",
              border: "0",
              margin: "10",
              lineHeight: "1.75",
              letterSpacing: "0.02857em",
              textTansform: "uppercase",
              minWidth: "64px",
              padding: "6px 16px",
              borderRadius: "4px",
              ":hover": { background: "#3675B7" },
            }}
          >
            Annuler
          </button>
          <button
            onClick={() => handleClose(true)}
            style={{
              display: "inline-flex",
              background: "#3675B7",
              color: "white",
              padding: "6px 16px",
              textAlign: "right",
              fontSize: "0.875rem",
              outline: "0",
              border: "0",
              margin: "10",
              lineHeight: "1.75",
              letterSpacing: "0.02857em",
              textTansform: "uppercase",
              minWidth: "64px",
              padding: "6px 16px",
              borderRadius: "4px",
              ":hover": { background: "#3675B7" },
            }}
            autoFocus
          >
            Oui
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DeleteConfirmation;
