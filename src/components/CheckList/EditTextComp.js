import React,{useState, useEffect} from "react";
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
import { Store } from "../../StoreContext";
import { UpdateStore } from "../../StoreContext";
import { Multiselect } from "multiselect-react-dropdown";
import DatePickers, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
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
const format = "DD/MM/YYYY";
const min = -2;
const max = 12;
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    height: "60vh",
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
  blanksLength,
  editSentenceTab,
  setEditSentenceTab
}) => {
  const [dates, setDates] = useState([
    new DateObject().set({ day: 4, format }),
    new DateObject().set({ day: 25, format }),
    new DateObject().set({ day: 20, format }),
  ]);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");
  const [String, setString] = useState("");
  const [tags, setTags] = useState([]);
  useEffect(() => {
    setDates([]);
  }, []);
  const store = Store();
  const updateStore = UpdateStore();
  const handleClose = () => {
    setOpenSubcheck(false);
  };
 
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
      <BootstrapDialog
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openSubcheck}
        maxWidth="md"
      >
        <BootstrapDialogTitle id="customized-dialog-title">
          Edit
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
              {subSentenceText}
            </span>
            {
            editSentenceTab ? (
              <>
               
                {/* {props?.levelSublength > 0 ||
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
                ) : null} */}
                 {/*select*/}
                 

                  {/*multi select*/}
                {blanksLength?.intLength > 0||
              blanksLength?.editintLength>0
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
                       blanksLength?.intLength? 
                        blanksLength?.intLength:
                        blanksLength?.editintLength
                      }
                    />
                  </div>
                ) : null}
                 {/*multi select*/}

                  {/*datepicker*/}
                {
                blanksLength?.datelength > 0 ||
                blanksLength?.editDateLength>0
                ? (
                  <DatePickers
                    inputClass="custom-input cursor"
                    placeholder="DD/MM/YYYY"
                    value={dates}
                    onChange={setDates}
                    disableDayPicker={
                      // (dates?.length == dateLength &&
                      //   dateLength != 0) ||
                      // (dates?.length == editDateLength &&
                      //   editDateLength != 0) ||

                      (dates?.length == blanksLength?.datelength && blanksLength?.datelength!=0
                        ? true
                        : false
                      )||
                      (dates?.length == blanksLength?.editDateLength &&
                        blanksLength?.editDateLength != 0? true:false)
                    }
                    disableMonthPicker={
                      // (dates?.length == dateLength &&
                      //   dateLength != 0) ||
                      // (dates?.length == editDateLength &&
                      //   editDateLength != 0) ||
                      dates?.length == blanksLength?.datelength
                        ? true
                        : false
                    }
                    disableYearPicker={
                      // (dates?.length == dateLength &&
                      //   dateLength != 0) ||
                      // (dates?.length == editDateLength &&
                      //   editDateLength != 0) ||
                      dates?.length == blanksLength?.datelength
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
                 {/* {props?.EmptyStringBlankLength > 0 ||
                props?.stringLength > 0 ? (
                  <input
                    style={{ width: "17%", marginBottom: "2%" }}
                    type="text"
                    placeholder="Enter String"
                    className="custom-input cursor"
                    value={String}
                    onChange={(e) => StringChange(e)}
                  />
                ) : null} */}
                  {/* single string */}
                   {/* multi string */}
                {blanksLength?.strLength > 0||
                blanksLength?.strEditString>0
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
                    disabled={blanksLength?.strLength<=tags?.length || (blanksLength?.strEditString<=tags?.length && !blanksLength?.strLength) ?true:false}
                  />
                </div>

                ) : null}
                 {/* multi string */}
                 
              </>
            ) : (
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
                console.log("editor.getData()");
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setSubSentenceText(data);
              }}
            />
          </div> 
            )}
          </div>
          {/* <div className="ckeditor">
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
          </div> */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              saveChanges(
                subSentenceText,
                subSentenceId,
                serialName,
                SentenceNature,
                sectionid,
                blanksLength?.datelength? blanksLength?.datelength:"",
                dates ? dates : "",
                blanksLength?.intLength?
                blanksLength?.intLength:"",
                items? items:"",
                tags?tags:"",
                blanksLength?.strLength?
                blanksLength?.strLength:"", 
              );
              setSubcheck(subSentenceId);
              updateStore({
                implantationtabdata:{
                  ...store?.implantationtabdata,
                 implantationsubchecked:subSentenceId
              }})
              setOpenSubcheck(false);
              setDates([]);
              setValue("");
              setString("");
              setItems([]);
              setTags([]);
              setSubSentenceText("")
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
