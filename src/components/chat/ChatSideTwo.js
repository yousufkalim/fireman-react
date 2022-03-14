import React,{useState} from 'react'
import SendIcon from '@mui/icons-material/Send';
import { Input } from '@mui/material';
const ChatSideBarTwo = (props) => {
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("message", message );
   
    var chat_active = localStorage.getItem("activeChat");
     const isUserProvided = chat_active && chat_active !== '';
     const isMessageProvided = message && message !== '';

    if (isUserProvided && isMessageProvided) {
        props.sendMessage(chat_active, message);
    } 
    else {
        alert('Please insert an user and a message.');
    }
    setMessage("")
}

const onUserUpdate = (e) => {
    setUser(e.target.value);
}

const onMessageUpdate = (e) => {
    setMessage(e.target.value);
}
  return (
    <>
    <form style={{display:"flex", padding:"10px", borderTop:"3px solid #314A6C" }}
            onSubmit={onSubmit}>
           
            <Input 
            className='submit-text'
              style={{width:"95%",border:"none"}}
                type="text"
                id="message"
                name="message" 
                value={message}
                onChange={onMessageUpdate}
                autoComplete="off"
                disableUnderline={true}
                />
              
            {/* <button>Submit</button> */}
            <SendIcon  onClick={onSubmit}/>
        </form>
    </>
  )
}

export default ChatSideBarTwo