import React, { useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import blacktick from "../../assets/blacktick.png";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ChatSideTwo from './ChatSideTwo'
import CancelPresentationSharpIcon from "@mui/icons-material/CancelPresentationSharp";
const ChatWindow = (props) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [props.chat]);
  console.log(props?.chat,"lk");
  const chat = props.chat.map((m) => (
    // <Message
    //     key={Date.now() * Math.random()}
    //     user={m.user}
    //     message={m.message}

    //     />
    <>
      <Box
        sx={{ display: "flex", justifyContent: m.isSender ? "end" : "start" }}
      >
        <Box
          sx={{
            display: "flex",
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: m.isSender ? "none" : "15px",
            borderTopRightRadius: "15px",
            borderTopLeftRadius: m.isSender ? "15px" : "none",
            justifyContent: "space-between",
            width: "50%",
            padding: "2% 2%",
            margin: "10px",
            textAlign: "start",
            // color:m.isSender? "#9095A3": "#000000",
            background: m.isSender ? "#ffffff" : "aliceblue",
            border: m.isSender ? "1px solid #e9eaef" : "none",
          }}
        >
          {m.message}
          {m.isSender && m.status == "sent" ? (
            <DoneIcon sx={{ color: "black" }} />
          ) : null || (m.isSender && m.status == "received") ? (
            <img style={{ width: "25px" }} src={blacktick} />
          ) : null || (m.isSender && m.status == ("Seen" && "read")) ? (
            <DoneAllIcon sx={{ color: "green" }} />
          ) : null}
        </Box>
      </Box>
    </>
  ));

  return (
    <div >
      <Box
        sx={{
          padding: "2% 2%",
          display: "flex",
          borderBottom: "3px solid #314A6C",
          background: "#314A6C",
          color: "#fff",
          justifyContent:"space-between"
        }}
      >
        {props?.activeChat?.chatroom_label?props?.activeChat?.chatroom_label:".......loading"}
       <CancelPresentationSharpIcon className="cursor" onClick={props.handleClose}/>
      </Box>
      <Box sx={{ padding: "5%", height:"61vh",overflowY:"scroll" }}>
          {chat}
          <div ref={messagesEndRef} />
       </Box>
       <ChatSideTwo sendMessage={props.sendMessage}/>
    </div>
  );
};

export default ChatWindow;