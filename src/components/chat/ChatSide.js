import React, { useRef, useEffect, useState } from "react";

import { ChatFeed } from "react-chat-ui";
import { Link } from "react-router-dom";
import { Translation } from "react-i18next";
import moment from "moment";
import BlockIcon from '@mui/icons-material/Block';
import { Tooltip } from "antd";
import SendIcon from '@mui/icons-material/Send';
import { Input, MessageBox } from "react-chat-elements";
import Box from "@mui/material/Box";
const ChatSide = (props) => {
  const messagesEnd = useRef(null);
  const [lastTime, setLastTime] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [days, setDays] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    calculateDate();
  }, [props.messageList, props.activeChat]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [props.messageList, props.refresh]);

  const calculateDate = () => {
    const lastSeen = moment(props.activeChat?.lastSeen).toDate();
    const todayDate = moment().toDate();
    // const diff = todayDate.diff(lastSeen);
    const diff = moment(todayDate, "DD/MM/YYYY HH:mm:ss").diff(
      moment(lastSeen, "DD/MM/YYYY HH:mm:ss")
    );
    var d = moment.duration(diff);
    const days = parseInt(d._data.days);

    const formatTime = moment(lastSeen).format("hh:mm a");
    const formatDate = moment(lastSeen).format("DD/MM/YYYY");
    setLastTime(formatTime);
    setLastDate(formatDate);
    setDays(days);
    // console.log("chat date format ", formats);

    // let finalDate = "";
    // if (days === "0") {
    //   finalDate = `today at ${formatTime}`;
    // } else if (days === "1") {
    //   finalDate = `yesterday at ${formatTime}`;
    // } else {
    //   finalDate = `yesterday at ${formats}`;
    // }
    console.log("chat date day ", days);
    console.log("chat date diff ", d);
    console.log("chat date last ", lastSeen);
    console.log("chat date today ", todayDate);
  };
  console.log("aGF>>?<>><><><><><><><><><>?>??><>?><><>?> ", props.messageList);
  console.log("active chat side ", props.activeChat);
  
  return (
    <Translation>
      {(t) => (
        <div className="chatSide">
          <div className="chatSide__header">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexBasis: "55%",
              }}
            >
              <div style={{ marginTop: "0px", fontSize: "16px" }}>
                <div>
                  {props?.activeChat && props.activeChat?.chatroom_label}
                </div>
                {props?.activeChat && props.activeChat?.lastSeen ? (
                  <div
                    className="ml-2 d-inline-block"
                    style={{ fontSize: "12px" }}
                  >
                    {days === 0
                      ? `last seen today at ${lastTime}`
                      : days === 1
                      ? `last seen yesterday at ${lastTime}`
                      : `last seen ${lastDate} at ${lastTime}`}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {props?.activeChat?.user_role !== "Student" ? (
                <Link to={`/admin/calender/${props.activeChat?.reciever}`}>
                  <button className="chat-rebook">{t("Book Me")}</button>
                </Link>
              ) : (
                ""
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                flexBasis: "45%",
                gap: "20px",
              }}
            >
              {props?.activeChat?.block ? (
                props.activeChat.blockBy === props.currentUser ? (
                  <Tooltip title={t("Unblock")} color="#ff8c00">
                    <BlockIcon
                    className="chat-block-icon"
                      color={"#ff8c00"}
                      onClick={() => props.blockUser(false)}
                      size={30}
                    />
                  </Tooltip>
                ) : (
                  // <Button
                  //   className="chat-block"
                  //   onClick={() => props.blockUser(false)}
                  // >
                  //   {t("Unblock")}
                  // </Button>
                  ""
                )
              ) : (
                <>
                  <Tooltip title={t("Block")} color="#dd1f1f">
                    <BlockIcon
                    className="chat-block-icon"
                      color={"#dd1f1f"}
                      onClick={() => props.blockUser(true)}
                      size={30}
                    />
                  </Tooltip>
                  {/* <Button
                    className="chat-block"
                    onClick={() => props.blockUser(true)}
                  >
                    {t("Block")}
                  </Button> */}
                </>
              )}
              <small>
                {t(props?.activeChat && props.activeChat?.user_role)}
              </small>
            </div>
          </div>
          <div className="ChatContent">
            <div className="chatSide__body">
              {/* {console.log("props?.messageList",props?.messageList)} */}
              
              {/* {props?.messageList.map((item, index) => {
                return (
                  <MessageBox
                    position={item.isSender ? "right" : "left"}
                    text={item.message}
                    toBottomHeight={"100%"}
                    dateString=""
                    status={item.status}
                    titleColor={"#8717ae"}
                    data={{
                      status: {},
                    }}
                  />
                 
                );
              })} */}
                {
                  props.messageList.map((item)=>{
                    return(
                      <> 
                       <Box sx={{textAlign:item.isSender? "center": "start", color:"red", fontSize:'30px' }}>{item.message} </Box>
                        <Box sx={{textAlign:item.isSender? "center": "start" }}>{item.status} </Box> 
                      </>
                    
                    )
                  })
                }
              {props?.activeChat?.block &&
                (props.activeChat.blockBy !== props.currentUser ? (
                  <div className="pb-5 chat-block-text">{`${t(
                    "You are blocked by"
                  )} ${props?.activeChat?.chatroom_label}`}</div>
                ) : (
                  <div className="pb-5 chat-block-text">{`${t("You blocked")} ${
                    props?.activeChat?.chatroom_label
                  }`}</div>
                ))}

              {/* <ChatFeed
            messages={props.messageList}
            isTyping={false}
            hasInputField={false}
            showSenderName={false}
            bubblesCentered={false}
            bubbleStyles={{
              // text: {
              //   fontSize: 12,
              // },
              chatbubble: {
                backgroundColor: "darkorange",
                borderRadius: 4,
                padding: 10,
              },
              userBubble: {
                backgroundColor: "#149e7a",
                borderRadius: 4,
                padding: 10,
              },
              text: {
                fontSize: 15,
              },
            }}
          /> */}

              <div ref={messagesEndRef} />
            </div>
            {/* div footer */}
            {!props?.activeChat?.block && (
              <div className="chatSide__footer">
                <form className="chatSide__form" onSubmit={props.sendMessages}>
                  <input
                    type="text"
                    placeholder="send message"
                    className="chat"
                    onChange={props.changeMessage}
                    value={props.messageValue}
                  />
                  {/* <i
                    style={{ color: "#149e7a" }}
                    title="Send"
                    className="fa fa-paper-plane"
                    onClick={props.sendMessages}
                  ></i> */}
                   

                   <SendIcon  onClick={props.sendMessages}/>

                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </Translation>
  );
};

export default ChatSide;