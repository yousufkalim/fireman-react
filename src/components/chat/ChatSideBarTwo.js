import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
// import useState from 'react-usestateref'
import ron from "../../assets/ronaldo.jpeg";
const ChatSideBarTwo = (props) => {
  const AlertShow = (chatid) => {
    let blink = "";
    if (
      props?.state?.CurrentReceivedmsgData?.chatid == chatid &&
      props?.activeChat?.chatroom_id != chatid
    ) {
      blink = "blink";
    }
    return blink;
  };
  return (
    <>
      <div style={{ background: "#314A6C" }} className="chatSidebar__body">
        <Box sx={{ padding: "20.8px" }}></Box>
        <Box sx={{ padding: "8% 0%", color: "#ffffff" }}>
          <Box
            sx={{
              textAlign: "center",
              width: "92%",
              margin: "auto",
              marginBottom: "25px",
            }}
          >
            <h2> Recent Chats</h2>
          </Box>
          {console.log("props.chatList", props.chatList)}
          {props.chatList?.map((chat) => (
            <div
              className={AlertShow(chat.chatroom_id)}
              key={chat.chatroom_id}
              onClick={() => props.chatChange(chat)}
            >
              <div className="online-users">
                {/* <span id="dots" className={`${chat.isOnline? "dot":"dot-unactive" }`}></span> */}
                <img className="profile-pic" src={ron} />
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
  );
};

export default ChatSideBarTwo;
