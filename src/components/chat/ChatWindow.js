import React,{useRef, useEffect} from 'react';
import Box from "@mui/material/Box";
// import Message from './Message';
import blacky from '../../assets/blacky.png'
import green from '../../assets/greenish.png'
import blacktick from '../../assets/blacktick.png'
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelPresentationSharpIcon from '@mui/icons-material/CancelPresentationSharp';
const ChatWindow = (props) => {
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }
      useEffect(scrollToBottom, [props.chat]);
     
    // console.log("chat", props.chat);
    // console.log("activeChat",props.activeChat?.chatroom_label);
    const chat = props.chat
        .map(m => 
        
        // <Message 
        //     key={Date.now() * Math.random()}
        //     user={m.user}
        //     message={m.message}
            
        //     />
        <> 
         
        <Box sx={{ display:"flex", justifyContent:m.isSender?"end":"start"}}> 
        
            <Box sx={{
            display:"flex",
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: m.isSender? "none":"15px",
            borderTopRightRadius: "15px",
            borderTopLeftRadius: m.isSender? "15px" : "none",
            justifyContent:"space-between", 
            width:"50%", padding:"2% 2%", 
            margin:"10px", 
            textAlign:"start", 
            // color:m.isSender? "#9095A3": "#000000", 
            background:m.isSender? "#ffffff":"aliceblue",
            border: m.isSender? "1px solid #e9eaef":"none"
        }}   
            >
           {m.message}
           {
           m.isSender && (m.status=="sent")?   <DoneIcon sx={{color:"black"}}/>:null
           ||
           m.isSender && (m.status=="received")? <img style={{width:"25px"}} src={blacktick}/>:null
           ||
           m.isSender && (m.status==("Seen" && "read"))? <DoneAllIcon sx={{color:"green"}}/>:null
           }
           
            </Box>
    </Box>  
    </>
            );

           

            
    return(
        <div style={{height:"84vh", overflowY:"scroll"}}>
            
<Box sx={{padding:"20px 0px", display:"flex", justifyContent:"space-between", borderBottom:"3px solid #314A6C", background:"#314A6C", color:"#fff", position:"fixed", width:"76.8%"}}>
{props?.activeChat?.chatroom_label}
</Box>
            <Box sx={{marginTop:"40px", padding:"5%"}}>{chat} </Box>
            <div ref={messagesEndRef} />
           
        </div>
    )
};

export default ChatWindow;