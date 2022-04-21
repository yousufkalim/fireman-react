import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const EditTextComp = ({
  openSubcheck,
  setOpenSubcheck,
  subSentenceText,
  setSubSentenceText,
  subSentenceId,
  setSubcheck,
  saveChanges,
  serialName,
  SentenceNature,
  sectionid,
}) => {
  const handleClose = () => {
    setOpenSubcheck(false);
  };
  return (
    <>
      <BootstrapDialog
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openSubcheck}
        maxWidth="lg"
      >
        <BootstrapDialogTitle id="customized-dialog-title">
          Edit
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="ckeditor">
            <CKEditor
              editor={ClassicEditor}
              data={subSentenceText && subSentenceText}
              config={{
                toolbar: [
                  "bold",
                  "italic",
                  "undo",
                  "redo",
                  "underline",
                  "NumberedList",
                  "BulletedList",
                ],
              }}
              onReady={(editor) => {}}
              onInit={(editor) => {
                console.log("Editor <><>!", editor);
              }}
              onKeyDown={(editor) => {
                console.log(editor.getData());
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setSubSentenceText(data);
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              saveChanges(
                subSentenceText,
                subSentenceId,
                serialName,
                SentenceNature,
                sectionid
              );
              setSubcheck(subSentenceId);
              setOpenSubcheck(false);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default EditTextComp;
