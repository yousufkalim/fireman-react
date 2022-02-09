import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import parse from "html-react-parser";
import Checkbox from "@mui/material/Checkbox";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import CreateIcon from '@mui/icons-material/Create';
import EditTextComp from './EditTextComp';


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
const Subchecklist = ({
  sentenceStatus,
  subcheckData,
  subCheck,
  setSubcheck,
  subcheckIndex,
  setSubCheckIndex,
}) => {
  useEffect(() => {
    setOpen(true);
  }, [sentenceStatus]);

  const [open, setOpen] = useState(
    sentenceStatus.subcheck === 2 ? true : false
  );
  const [closeSatate, setCloseSatate] = useState("");
  const [snack, setSnack] = useState(false);
  const [opensubCheck, setOpenSubcheck] = useState(false);
  const [subSentenceText, setSubSentenceText] = useState("");
  const [subSentenceId, setsubSentenceId] = useState("");
  const handleClose = () => {
    setSnack(false);
  };
  const saveChanges=(sentence, sentenceid)=>{
 console.log(sentence,sentenceid);
 setCloseSatate(sentenceid)
 const objIndex = subcheckData?.findIndex((obj => obj?.sectionSubSentencesId === sentenceid));
 console.log("objIndex",objIndex);
 subcheckData[objIndex].subSentenceText = sentence
 //console.log("objIndex",objIndex);
 console.log("sub", subcheckData);
  }
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  console.log("sub", subcheckData);

  return (
    <>
      {
        <BootstrapDialog
          // onClose={props.handleClose}
          fullWidth={true}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth="lg"
        >
          <BootstrapDialogTitle id="customized-dialog-title">
            Edit title
          </BootstrapDialogTitle>
          <DialogContent dividers>
            {subcheckData?.map((val) => (
              <>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent:"space-between" }}>
                  <Box sx={{display:"flex", alignItems: "center"}}> 
                  <Checkbox
                    icon={<CircleUnchecked />}
                    checkedIcon={<CircleCheckedFilled />}
                    style={{
                      color: `${val?.sentenceColor}`,
                    }}
                    checked={subCheck == val?.sectionSubSentencesId}
                    onClick={() => {
                      if(val?.sentenceNature===1){
                        setSubSentenceText(val?.subSentenceText)
                        setsubSentenceId(val?.sectionSubSentencesId)
                        setSubcheck(val?.sectionSubSentencesId);
                        setOpenSubcheck(true) 
                      }
                      else{
                        setCloseSatate(val?.sectionSubSentencesId);
                        setSubcheck(val?.sectionSubSentencesId);
                        setSubCheckIndex(subcheckIndex);
                      }
                    }}
                    classes={{ root: "custom-checkbox-root" }}
                  />
                  <p>{parse(val?.subSentenceText)}</p>
                  </Box>
                  <CreateIcon onClick={()=>{
                    setOpenSubcheck(true) 
                    setsubSentenceId(val?.sectionSubSentencesId)
                    setSubSentenceText(val?.subSentenceText)}
                  }/>
                </Box>
              </>
            ))}
            <Snackbar
              severity="error"
              open={snack}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Veuillez sélectionner une option pour continuer"
              action={action}
              style={{ height: "100%" }}
              anchorOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                console.log("closeSatate",closeSatate);
                console.log("subCheck",subCheck);
                if (
                  closeSatate == subCheck &&
                  closeSatate !== "" &&
                  subCheck !== ""
                ) {
                  setOpen(false);
                  setCloseSatate("");
                } else {
                  setSnack(true);
                }
              }}
              autoFocus
            >
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      }
      <EditTextComp 
      saveChanges={saveChanges} 
      subSentenceId={subSentenceId} 
      subSentenceText={subSentenceText}  
      setSubSentenceText={setSubSentenceText} 
      openSubcheck={opensubCheck} 
      setOpenSubcheck={setOpenSubcheck}
      setSubcheck={setSubcheck}
      />
    </>
  );
};

export default Subchecklist;
