import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
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

export default function CustomizedDialogs(props) {
  let [sentence, setSentence] = React.useState(
    props.accordionData?.sentenceText
      ? props.accordionData?.sentenceText
      : props.text
  );
  const [value, setValue] = React.useState(null);
console.log(props);
  return (
    <div>
      <BootstrapDialog
        fullWidth={true}
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        maxWidth="lg"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={props.handleClose}
        >
          Edit title
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* {props?.sectionType==0||props?.sectionType==2||props?.datetab? (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                label="Select Date"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                    setSentence(props.text.replace(/[^a-zA-Z0-9 ]/g, '') + moment(newValue,"YYYY-MM-DD").
                    format("YYYY-MM-DD")
                    )
                  }}
                  renderInput={(params) => (
                    <TextField
                      sx={{ width: "50%", background: "#e9e9e9" }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            ) :  
            <div className="ckeditor">
            <CKEditor
              editor={ClassicEditor}
              data={
                props.accordionData?.sentenceText
                  ? props.accordionData?.sentenceText
                  : props?.text
              }
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
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onInit={(editor) => {
                console.log("Editor <><>!", editor);
              }}
              onKeyDown={(editor) => {
                console.log(editor.getData());
              }}
              onChange={(event, editor) => {
                console.log(editor.selectionStart);
                const data = editor.getData();
                setSentence(data);
              }}
            />
          </div>
          } */}

<div className="ckeditor">
            <CKEditor
              editor={ClassicEditor}
              data={
                props.accordionData?.sentenceText
                  ? props.accordionData?.sentenceText
                  : props?.text
              }
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
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onInit={(editor) => {
                console.log("Editor <><>!", editor);
              }}
              onKeyDown={(editor) => {
                console.log(editor.getData());
              }}
              onChange={(event, editor) => {
                console.log(editor.selectionStart);
                const data = editor.getData();
                setSentence(data);
              }}
            />
          </div>
          </div>
         
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              props.saveChanges(
                sentence
                  ? sentence
                  : props.accordionData?.sentenceText
                  ? props.accordionData.sentenceText
                  : props.text,
                props.accordionData?.sectionSentencesId
                  ? props.accordionData?.sectionSentencesId
                  : props?.checklistid,
                props.accordionData?.sentenceNature
                  ? props.accordionData?.sentenceNature
                  : "",
                props?.seriesName ? props?.seriesName : "",
                props.sectionType ? props.sectionType : "",
                props.sectionid ? props.sectionid : "",
              );
              props?.setSubcheck("");
              props.setOpen(false);
            }}
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
