import React, {useEffect} from 'react';
import EditModal from "../Modals/EditCheckBox"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
  setSentenceStatus,
  subcheckData
}) => {
  useEffect(() => {
    console.log(subcheckData);
    setOpen(true)
  }, []);
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false); 
    setSentenceStatus((pre)=>{
    return{
  ...pre,
  subcheck:false
    }
  })
}
   
  return (

  <>
  {
    
      <BootstrapDialog
                // onClose={props.handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Edit title
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className='ckeditor'>
                    { subcheckData?.map((val)=>(
                    <CKEditor
                        editor={ClassicEditor}
                      
                        data={val.subSentenceText}
                        
                        config={{
                            toolbar: ['bold', 'italic', "undo", "redo", 'underline', 'NumberedList', 'BulletedList']
                        }}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            //setSentence(data)
                        }}
                    />
                    ))}
                    </div>
                  
                </DialogContent>
                <DialogActions>
                    <Button autoFocus >
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
    
   
}
  </>
  
  );
};

export default Subchecklist;
