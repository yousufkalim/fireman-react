import React from 'react'
import Box from "@mui/material/Box";
const ChatSideBarTwo = (props) => {
  return (
    <>
    
       
      <div className="chatSidebar__body">
      <Box sx={{background:"#314A6C", padding:"20.8px"}}></Box>
        <Box sx={{padding:"10px", color:"#9095A3", background:"aliceblue"}}> 

      
              <Box sx={{textAlign:"center", width:"92%", margin:"auto", marginBottom:"25px"}}>
               <h3> Recent Chats</h3>
                
                </Box>
              {console.log("props.chatList",props.chatList)}
              {props.chatList?.map((chat) => (
                <div
                  className={
                    props.activeChat === chat.chatroom_id
                      ? "chatInfo activeChat"
                      : "chatInfo"
                  }
                  key={chat.chatroom_id}
                  onClick={() => props.chatChange(chat)}
                >
                  <div
                  className="online-users"
                  >
                        <span id="dots" className={`${chat.isOnline? "dot":"dot-unactive" }`}></span>
                        <p className="chat_user_name">{chat.chatroom_label}</p>
                    
                    {/* <a href={`/admin/user/${chat.reciever}`}>
                      <i class="fas fa-eye chat-view-btn"></i>
                    </a> */}
                  </div>
                  {/* {chat.unread ? <span className="unread_chat"></span> : ""} */}
                </div>
              ))}
           
           </Box>
            </div>
          
    </>
  )
}

export default ChatSideBarTwo