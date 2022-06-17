import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import api from "../api";
const DeleteConfirmation = ({ setOpen, open, userDelete, getGridData }) => {
  const handleClose = (deleteUser) => {
    if (deleteUser == true) {
      api(
        "delete",
        `/api/v1/Users/delete_user/${userDelete?.data?.employeeId}`
      ).then((res) => {
        console.log(res);
        if(res?.data==true){
          toast.success("Utilisateur supprimé");
          getGridData()
        }
       
      });
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
      >
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
              background: "#9FA5AB",
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