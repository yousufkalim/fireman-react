import React, { useState, useEffect } from "react";
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
import TextField from '@material-ui/core/TextField';
import DatePickers, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import moment from "moment";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
    height: "40vh",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(4),
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
const format = "DD/MM/YYYY";
const min = -2;
const max = 12;
export default function CustomizedDialogs(props) {
  let [sentence, setSentence] = React.useState(
    props.accordionData?.sentenceText
      ? props.accordionData?.sentenceText
      : props.text
  );
  const [dates, setDates] = useState([
    new DateObject().set({ day: 4, format }),
    new DateObject().set({ day: 25, format }),
    new DateObject().set({ day: 20, format }),
  ]);
  const [value, setValue] = useState("")
  const [String, setString] = useState("")
  useEffect(() => {
    setDates([]);
  }, []);
  const onChange = (e)=>{
    let value= parseInt(e.target.value);
    if (value > max)
    { value = max;}
    if (value < min){
       value = min;
    }
    setValue(value);
  }
  const StringChange = (e)=>{
    setString(e.target.value)
  }
  console.log(props);
  return (
    <div>
      <BootstrapDialog
        fullWidth={true}
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        maxWidth="md"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={props.handleClose}
        >
          Edit title
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="cursor" style={{ display: "flex", flexDirection:"column", justifyContent: "center", alignItems:"center"}}>
            <span  style={{width:"60%", marginBottom:"2%", height:"auto"}}  className="custom-input">{props?.text}</span>
            {props?.sectionType == 0 ||
            props?.sectionType == 2 ||
            props?.datetab ? (
              <>
              {
                props?.EmptyStringBlankLength>0 || props?.stringLength>0?
                (<input
                  style={{width:"17%", marginBottom:"2%"}} 
                 type="text"
                 placeholder="Enter String" 
                 className="custom-input cursor"
                 value={String}
                 onChange={(e)=>StringChange(e)}
                 />):
                null
              }
              {
                  props?.levelSublength>0 ||
                  props?.leveladdeditlength>0||
                  props?.leveladdlength>0||
                  props?.levelsubeditlength>0? 
                  (
              <input
              style={{width:"17%", marginBottom:"2%"}} 
              //disabled={props?.leveladdlength==0 && props?.levelSublength==0 && props?.levelsubeditlength && props?.leveladdeditlength? true:false} 
              placeholder="Enter Level" 
              className="custom-input cursor" 
              type="number"
              value={value}
              onChange={(e)=>onChange(e)}
              />
              ): null
              }
              {
                props?.dateLength>0 || props?.editDateLength>0?(
                   <DatePickers
                  inputClass="custom-input cursor"
                  placeholder="DD-MM-YYYY"
                  value={dates}
                  onChange={setDates}
                  disableDayPicker={
                    (dates?.length == props?.dateLength && props?.dateLength!=0) || (dates?.length == props?.editDateLength  && props?.editDateLength!=0)? true : false}
                  disableMonthPicker={
                    (dates?.length == props?.dateLength && props?.dateLength!=0) || (dates?.length == props?.editDateLength && props?.editDateLength!=0)? true : false}
                  disableYearPicker={
                    (dates?.length == props?.dateLength && props?.dateLength!=0) || (dates?.length == props?.editDateLength && props?.editDateLength!=0)? true : false}
                  multiple
                  sort
                  format={format}
                  calendarPosition="bottom-center"
                  plugins={[<DatePanel />]}
                />
                ):null
                
                  }
              </>
            ) : (
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
            )}
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
               
                props.sectionid ? props.sectionid : "",
                dates?dates:"",
                value?value:"",
                props?.dateLength?props?.dateLength:"",
                props?.sectionType ? props?.sectionType : "",
                String?String:""
              )
              props?.setSubcheck("");
              props.setOpen(false);
              setDates([])
              setValue("")
              setString("")
            }}
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
