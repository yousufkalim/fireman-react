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
import CreateIcon from "@mui/icons-material/Create";
import EditTextComp from "./EditTextComp";
import pencil from "../../assets/pencilediticon.png";
import don from "../../assets/don.png";
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
  serialName,
  getSubCheckListData,
  setSentenceDetails,
  sentenceDetails,
  alreadyChecked,
  sectionid,
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

  const saveChanges = (
    sentence,
    sentenceid,
    serialName,
    SentenceNature,
    sectionId
  ) => {
    setSentenceDetails((pre) => {
      return {
        seriesname: serialName,
        sentenceNature: SentenceNature,
        text: sentence,
        id: sentenceid,
        sectionid: sectionId,
      };
    });
    setCloseSatate(sentenceid);
    const objIndex = subcheckData?.findIndex(
      (obj) => obj?.sectionSubSentencesId === sentenceid
    );
    subcheckData[objIndex].subSentenceText = sentence;
  };

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
  let newdata = [];
  let new2 = [];
  const a = alreadyChecked?.map((val) => val.subchecks);
  var merged = [].concat.apply([], a);
  const newarray = merged?.map((val) => {
    subcheckData.map((valtwo) => {
      if (valtwo.sectionSubSentencesId === val.sectionSubSentenceId) {
        newdata.push({
          ...valtwo,
          subSentenceText: val.modifiedSentenceText,
          alreadychecked: val.sectionSubSentenceId,
        });
      }
    });
  });
  newdata.map((i) => {
    new2 = subcheckData.findIndex(
      (s) => s.sectionSubSentencesId === i.sectionSubSentencesId
    );
    subcheckData[new2] = i;
  });

  return (
    <>
      {
        <BootstrapDialog
          fullWidth={true}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth="lg"
        >
          <BootstrapDialogTitle id="customized-dialog-title">
            Edit
          </BootstrapDialogTitle>
          <DialogContent dividers>
            {subcheckData?.map((val) => (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      icon={<CircleUnchecked />}
                      checkedIcon={
                        <svg
                          style={{
                            background: `${val.sentenceColor}`,
                            padding: "9px 8px",
                            borderRadius: "100%",
                          }}
                          width="13"
                          height="10"
                          viewBox="0 0 13 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.93143 9.80735C4.8085 9.93101 4.64077 10 4.46655 10C4.29232 10 4.1246 9.93101 4.00166 9.80735L0.288972 6.09406C-0.096324 5.70876 -0.096324 5.08398 0.288972 4.69941L0.753856 4.2344C1.13927 3.84911 1.76333 3.84911 2.14863 4.2344L4.46655 6.55244L10.7299 0.288972C11.1153 -0.096324 11.74 -0.096324 12.1247 0.288972L12.5896 0.753976C12.9748 1.13927 12.9748 1.76393 12.5896 2.14863L4.93143 9.80735Z"
                            fill="white"
                          />
                        </svg>
                      }
                      style={{
                        color: `${val?.sentenceColor}`,
                      }}
                      style={{
                        color: `${val?.sentenceColor}`,
                      }}
                      checked={
                        subCheck
                          ? subCheck == val?.sectionSubSentencesId
                          : val?.sectionSubSentencesId === val?.alreadychecked
                      }
                      onClick={() => {
                        setSentenceDetails((pre) => {
                          return {
                            sectionid: sectionid,
                            seriesname: serialName,
                            sentenceNature: val?.sentenceNature,
                            text: val?.subSentenceText,
                            id: val?.sectionSubSentencesId,
                          };
                        });

                        if (val?.sentenceNature === 1) {
                          setSubSentenceText(val?.subSentenceText);
                          setsubSentenceId(val?.sectionSubSentencesId);
                          setSubcheck(val?.sectionSubSentencesId);
                          setOpenSubcheck(true);
                        } else {
                          setCloseSatate(val?.sectionSubSentencesId);
                          setSubcheck(val?.sectionSubSentencesId);
                          setSubCheckIndex(subcheckIndex);
                        }
                      }}
                      classes={{ root: "custom-checkbox-root" }}
                    />
                    <p>{parse(val?.subSentenceText)}</p>
                  </Box>
                  <img
                    src={pencil}
                    onClick={() => {
                      setSentenceDetails((pre) => {
                        return {
                          ...pre,
                          sentenceNature: val?.sentenceNature,
                        };
                      });
                      setOpenSubcheck(true);
                      setsubSentenceId(val?.sectionSubSentencesId);
                      setSubSentenceText(val?.subSentenceText);
                    }}
                  />
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
                const arr = alreadyChecked.map((val) => val.subchecks);
                var merged = [].concat.apply([], arr);
                const b = merged.map((val) => val.sectionSubSentenceId);
                getSubCheckListData(
                  sentenceDetails.id,
                  sentenceDetails.text,
                  sentenceDetails.sentenceNature,
                  sentenceDetails.seriesname,
                  sentenceDetails.sectionid
                );
                if (
                  (closeSatate == subCheck &&
                    closeSatate !== "" &&
                    subCheck !== "") ||
                  subCheck === sentenceDetails.id ||
                  b.length > 0
                ) {
                  setOpen(false);
                  setCloseSatate("");
                } else {
                  setSnack(true);
                }
              }}
              autoFocus
            >
              Save
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
        serialName={serialName}
        SentenceNature={sentenceDetails.sentenceNature}
        sectionid={sectionid}
      />
    </>
  );
};

export default Subchecklist;
