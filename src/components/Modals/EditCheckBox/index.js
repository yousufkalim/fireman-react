import  React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';

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

export default function CustomizedDialogs(props) {
let [sentence,setSentence]=React.useState(props.accordionData&& props.accordionData.sentenceText)
   
   useEffect(() => {
    var re = /[_]+/g;
        if(props.accordionData.sentenceText){
          console.log((props?.accordionData&&props.accordionData?.sentenceText.match(re) || []).join(''));
        }
   }, [props]);
   console.log("props.accordionData",props.seriesName);
    return (
        <div>

           
            <BootstrapDialog
            fullWidth={true}
                onClose={props.handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.open}
                maxWidth="lg"
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose}>
                    Edit title 
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className='ckeditor'>
                    
                    <CKEditor 
                        editor={ClassicEditor}
                        data={props.accordionData.sentenceText}
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
                            // if(editor.commands._commands.delete){
                            //     alert("yes")
                            // }
                            //console.log(CKEDITOR);
                            // console.log(editor.getData());
                            const data = editor.getData();
                            setSentence(data)
                        }}
                    />
                    {/* <textarea style={{height:"200px"}} 
                    onKeyDown={(e)=>{
                        const value= e.target.selectionStart;
                        console.log(e.target.value[value-1])
                          if(e.keyCode===8){
                              if(e.target.value[value-1]!="_"){
                                e.preventDefault();
                              }
                             
                          }
                    }}
                    onChange={(e)=>{
                        console.log("e.keyCode");
                        setSentence(e.target.value)
                        //const value= e.target.selectionStart; 
                        //console.log(e.target.value[value-1])
                        }} defaultValue={props.accordionData.sentenceText}/> */}
                    </div>
                  
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={()=>{props.saveChanges(sentence?sentence:props.accordionData.sentenceText, props.accordionData.sectionSentencesId,props.accordionData.sentenceNature, props.seriesName); props.setSubcheck(""); props.setOpen(false)}}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
