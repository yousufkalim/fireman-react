
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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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

const EditTextComp = ({openSubcheck, setOpenSubcheck,subSentenceText,setSubSentenceText,subSentenceId,setSubcheck, saveChanges,serialName,SentenceNature}) => {
    const handleClose=()=>{
        setOpenSubcheck(false)
    }
    console.log("serialName",serialName);
    console.log("openSubcheck",openSubcheck);
    console.log("subSentenceText",subSentenceText&&subSentenceText);
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
                    Edit title 
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className='ckeditor'>
                    
                    <CKEditor 
                        editor={ClassicEditor}
                         data={subSentenceText&&subSentenceText}
                        config={{
                            toolbar: ['bold', 'italic', "undo", "redo", 'underline', 'NumberedList', 'BulletedList']
                        }}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onInit={ editor => {
                            console.log( 'Editor <><>!', editor );
                        } }
                        onKeyDown={(editor)=>{console.log(editor.getData())}}
                        onChange={(event, editor) => {
                               console.log( editor.selectionStart);
                            const data = editor.getData();
                            setSubSentenceText(data)
                        }}
                    />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{
                        saveChanges(subSentenceText,subSentenceId, serialName, SentenceNature); 
                        setSubcheck(subSentenceId); 
                        setOpenSubcheck(false);
                        
                    }}
                        
                        >
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
  </>
  );
};

export default EditTextComp;
