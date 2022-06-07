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
import DatePickers, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

import { Multiselect } from "multiselect-react-dropdown";



const options = [
  { name: "-2", id: 1 },
  { name: "-1", id: 2 },
  { name: "0", id: 3 },
  { name: "1", id: 4 },
  { name: "2", id: 5 },
  { name: "3", id: 6 },
  { name: "4", id: 7 },
  { name: "5", id: 8 },
  { name: "6", id: 9 },
  { name: "7", id: 10 },
  { name: "8", id: 11 },
  { name: "9", id: 12 },
  { name: "10", id: 13 },
  { name: "11", id: 14 },
  { name: "12", id: 15 },
];

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
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");
  const [String, setString] = useState("");
  const [tags, setTags] = useState([]);
  //const [defaultValues, setDefaultValues] = useState(["test", "test2"]);
  useEffect(() => {
    setDates([]);
  }, []);
  const onChange = (e) => {
    let value = parseInt(e.target.value);
    if (value > max) {
      value = max;
    }
    if (value < min) {
      value = min;
    }
    setValue(value);
  };
  const StringChange = (e) => {
    setString(e.target.value);
  };
  const handleSelect = (selectedList) => {
    setItems(selectedList);
  };

  const handleRemove = (selectedList) => {
    setItems(selectedList);
  };



  const handleClickKeywordRemove = keyword => {
    const values = tags.filter(val => val?.text !== keyword);
    setTags(values);
  };
  const [tagText, setTagText] = useState(null);
  const handleKeywordAdd = e => {
    const { value } = e.target;
    if (!tags.includes(value) && e.keyCode === 13)
      setTags([...tags, {"text": value?.split('.').join("")}]); 
      if(e.keyCode === 13){
        setTagText("");
      }
    };
  return (
    <>
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
          <div
            className="cursor"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{ width: "60%", marginBottom: "2%", height: "auto" }}
              className="custom-input"
            >
              {props?.text ? props?.text : props?.sentenceText}
            </span>
            {props?.sectionType == 0 ||
            props?.sectionType == 2 ||
            props?.datetab ? (
              <>
               
                {props?.levelSublength > 0 ||
                props?.leveladdeditlength > 0 ||
                props?.leveladdlength > 0 ||
                props?.levelsubeditlength > 0 ? (
                  <input
                    style={{ width: "17%", marginBottom: "2%" }}
                    //disabled={props?.leveladdlength==0 && props?.levelSublength==0 && props?.levelsubeditlength && props?.leveladdeditlength? true:false}
                    placeholder="Enter Level"
                    className="custom-input cursor"
                    type="number"
                    value={value}
                    onChange={(e) => onChange(e)}
                  />
                ) : null}
                 {/*select*/}
                 

                  {/*multi select*/}
                {props?.blanksLength?.intLength > 0||
                props?.blanksLength?.editintLength>0
                ? (
                  <div style={{width:"89%"}}>
                    <Multiselect
                    style={{
                      chips: { background: "#3675B7" },
                      searchBox: { 
                      border: "1px #0c8af8 solid", 
                      borderRadius: "15px", 
                      marginBottom:"10px",
                      width:"100%",
                      padding:"2% 2%",
                      textAlign:"center",
                      boxShadow: "0 0 2px #0074d9"
                    },
                    }}
                    placeholder="Sélectionner......."
                      options={options} // Options to display in the dropdown
                      selectedValues={items} // Preselected value to persist in dropdown
                      onSelect={handleSelect} // Function will trigger on select event
                      onRemove={handleRemove} // Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                      selectionLimit={
                        props?.blanksLength?.intLength? 
                        props?.blanksLength?.intLength:
                        props?.blanksLength?.editintLength
                      }
                    />
                  </div>
                ) : null}
                 {/*multi select*/}

                  {/*datepicker*/}
                {props?.dateLength > 0 ||
                props?.editDateLength > 0 ||
                props?.blanksLength?.datelength > 0 ||
                props?.blanksLength?.editDateLength>0
                ? (
                  <DatePickers
                    inputClass="custom-input cursor"
                    placeholder="DD/MM/YYYY"
                    value={dates}
                    onChange={setDates}
                    disableDayPicker={
                      (dates?.length == props?.dateLength &&
                        props?.dateLength != 0) ||
                      (dates?.length == props?.editDateLength &&
                        props?.editDateLength != 0) ||

                      (dates?.length == props?.blanksLength?.datelength && props.blanksLength?.datelength!=0
                        ? true
                        : false
                      )||
                      (dates?.length == props?.blanksLength?.editDateLength &&
                        props?.blanksLength?.editDateLength != 0? true:false)
                    }
                    disableMonthPicker={
                      (dates?.length == props?.dateLength &&
                        props?.dateLength != 0) ||
                      (dates?.length == props?.editDateLength &&
                        props?.editDateLength != 0) ||
                      dates?.length == props?.blanksLength?.datelength
                        ? true
                        : false
                    }
                    disableYearPicker={
                      (dates?.length == props?.dateLength &&
                        props?.dateLength != 0) ||
                      (dates?.length == props?.editDateLength &&
                        props?.editDateLength != 0) ||
                      dates?.length == props?.blanksLength?.datelength
                        ? true
                        : false
                    }
                    multiple
                    sort
                    format={format}
                    calendarPosition="bottom-center"
                    plugins={[<DatePanel />]}
                  />
                ) : null}
                 {/*datepicker*/}


                 {/* single string */}
                 {props?.EmptyStringBlankLength > 0 ||
                props?.stringLength > 0 ? (
                  <input
                    style={{ width: "17%", marginBottom: "2%" }}
                    type="text"
                    placeholder="Enter String"
                    className="custom-input cursor"
                    value={String}
                    onChange={(e) => StringChange(e)}
                  />
                ) : null}
                  {/* single string */}
                   {/* multi string */}
                {props?.blanksLength?.strLength > 0||
                props?.blanksLength?.strEditString>0
                ? (
                  // <ReactTags
                  // classNames="ReactTags__tag ReactTags__tagInputField ReactTags__selected"
                  //   tags={tags}
                  //   handleDelete={handleDelete}
                  //   handleAddition={handleAddition}
                  //   handleDrag={handleDrag}
                  //   handleTagClick={handleTagClick}
                  //   inputFieldPosition="bottom"
                  //   autocomplete
                  //   editable={false}
                  //   placeholder="Press Enter to add new"
                  //   inputProps={{
                  //     disabled:props?.blanksLength?.strLength<=tags?.length?true:false
                  //   }}
                  // />
                  <div className="tags-input custom-input cursor">
                  <ul id="tags">
                    {tags.map((value, index) => (
                      <li className="tag" key={index}>
                        <span className="tag-title">{value?.text}</span>
                        <span
                          className="tag-close-icon"
                          onClick={() => handleClickKeywordRemove(value?.text)}
                        >
                          &times;
                        </span>
                      </li>
                    ))}
                  </ul>
                  <input
                    type="text"
                    value={tagText}
                    onKeyUp={e => handleKeywordAdd(e)}
                     onChange={(e)=>(setTagText(e.target.value))}
                    placeholder="Appuyez sur Entrée pour ajouter une chaîne..."
                    onKeyPress={e => e.key === "Enter" && e.preventDefault()}
                    disabled={props?.blanksLength?.strLength<=tags?.length || (props?.blanksLength?.strEditString<=tags?.length && !props?.blanksLength?.strLength) ?true:false}
                  />
                </div>

                ) : null}
                 {/* multi string */}
                 
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
              console.log(  props.accordionData?.sentenceText,"xyz1");
              console.log(sentence, "XYZ2");
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
                dates ? dates : "",
                value ? value : "",
                props?.dateLength ? props?.dateLength : "",
                props?.sectionType ? props?.sectionType : "",
                String ? String : "",
                items? items:"",
                props?.blanksLength?.intLength?
                props?.blanksLength?.intLength:"",
                tags?tags:"",
                props?.blanksLength?.strLength?
                props?.blanksLength?.strLength:"" 
              );
              props?.setSubcheck("");
              props.setOpen(false);
              /////overture
              setDates([]);
              setValue("");
              setString("");
              setItems([]);
              setTags([]);
              setSentence("")
              //////
            }}
          >
          Sauvegarder les modifications
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
    </>
  );
}
