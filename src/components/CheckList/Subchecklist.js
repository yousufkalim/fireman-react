import React, {useEffect} from 'react';
import EditModal from "../Modals/EditCheckBox"
import Dialog from '@mui/material/Dialog';
import Box from "@mui/material/Box";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';
import Checkbox from '@mui/material/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
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
                      position: 'absolute',
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
  setSubCheckIndex
}) => {
    useEffect(() => {
      setOpen(true)
    }, [sentenceStatus]);
    
     
  
  const [open, setOpen] = React.useState(sentenceStatus.subcheck===2?true: false);
  
  const handleClose = () => {
    setOpen(false); 
}
console.log("subcheckData",  subcheckData);  
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
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Edit title
                </BootstrapDialogTitle>
                <DialogContent  dividers>

                    {subcheckData?.map((val)=>(
                      <> 
                      <Box sx={{display:"flex", alignItems:"center"}}> 
                      <Checkbox
                                    icon={<CircleUnchecked />}
                                    checkedIcon={<CircleCheckedFilled />}
                                    style={{
                                        color: `${val.sentenceColor}`,
                                    }}
                                    checked={subCheck==val.sectionSubSentencesId}
                                     onClick={()=>{console.log(val); setSubcheck(val.sectionSubSentencesId); setSubCheckIndex(subcheckIndex)  }}
                                    classes={{ root: 'custom-checkbox-root' }}
                                />
                    <p>{val.subSentenceText}</p>
                      </Box>
                     
                    </>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button  onClick={()=>{setOpen(false)}}  autoFocus >
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
}
  </>
  
  );
};

export default Subchecklist;
