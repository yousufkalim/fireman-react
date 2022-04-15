import React,{useState} from 'react'
import SendIcon from '@mui/icons-material/Send';
import { Input } from '@mui/material';
import send from '../../assets/send.svg'
const ChatSideBarTwo = (props) => {
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("message", message );
   
    var chat_active = localStorage.getItem("activeChat");
     const isUserProvided = chat_active && chat_active !== '';
     const isMessageProvided = message && message !== '';
    if (isMessageProvided) {
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
    <form style={{display:"flex", padding:"1.5% 5%", background:"aliceblue"}}
            onSubmit={onSubmit}>
           
            <input 
            className='submit-text'
              style={{width:"95%",border:"none", background:"aliceblue", outline:"none"}}
                type="text"
                id="message"
                name="message" 
                value={message}
                onChange={onMessageUpdate}
                autoComplete="off"
                placeholder='Type a message here'
                />
              
            {/* <button>Submit</button> */}
            <div className='send-icon'> 
            <img  src={send}  onClick={onSubmit}/>
            </div>
        </form>

    </>
  )
}

export default ChatSideBarTwo