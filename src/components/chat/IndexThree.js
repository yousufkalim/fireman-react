import React from "react";
import ChatSideTwo from "./ChatSideTwo";
import { useEffect, useRef } from "react";
import useState from "react-usestateref";
import { HubConnectionBuilder } from "@microsoft/signalr";
import ChatWindow from "./ChatWindow";
import jwt from "jwt-decode";
import api from "../../api/index";
import ChatSideBarTwo from "./ChatSideBarTwo";
import Box from "@mui/material/Box";
import { Store } from "../../StoreContext";
import { UpdateStore } from "../../StoreContext";
const IndexThree = ({ handleClose }) => {
  const [state, setState, counterRef] = useState({
    messageList: [],
    chatList: [],
    userData: null,
    activeChat: "",
    activeReciever: "",
    message: "",
    search: "",
    searchList: [],
    isLoading: true,
    connection: "",
    msglist: [],
    CurrentReceivedmsgData: {},
    msgseenstatus: "",
  });
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);
  const store = Store();
  const updatestore = UpdateStore();
  latestChat.current = chat;
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://fireman-chat.falconconsulting.fr/chatHub")
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
    updatestore({
      connection: newConnection,
    });
    //console.log("started", newConnection);
  }, []);

  useEffect(() => {
    var token = localStorage.getItem("userData");
    var chat_active = localStorage.getItem("activeChat");
    const userData = jwt(token);
    setState((pre) => {
      return {
        ...pre,
        userData: userData,
      };
    });
    // list all chat list
    //loadChatListData(token, userData.Id, chat_active);
  }, []);
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          var token = localStorage.getItem("userData");
          var chat_active = localStorage.getItem("activeChat");
          const userData = jwt(token);
          const userId = userData.Id;
          ////////start

          api("get", `/api/v1/chat/GetChatList/${userData.Id}`).then((res) => {
            var chatlist = [];
            res?.data?.data?.map((chat) => {
              var a = chat.userA;
              var b = chat.userB;
              if (a?.employeeId != userId) {
                chatlist.push({
                  chatroom_id: chat.id,
                  chatroom_label: `${a?.empFirstName} ${a?.empLastName}`,
                  user_role: a?.role,
                  reciever: a?.employeeId,
                  unread: false,
                  isOnline: a?.isOnline,
                  lastSeen: a?.lastSeen,
                  block: chat?.block,
                  blockBy: chat?.blockBy,
                });
                //this.setState({ isLoading: false });
                setState((pre) => {
                  return {
                    ...pre,
                    isLoading: false,
                  };
                });
              } else {
                if (b?.employeeId != userId) {
                  chatlist.push({
                    chatroom_id: chat?.id,
                    chatroom_label: `${b?.empFirstName} ${b?.empLastName}`,
                    user_role: b?.role,
                    reciever: b?.employeeId,
                    unread: false,
                    isOnline: b?.isOnline,
                    lastSeen: b?.lastSeen,
                    block: chat?.block,
                    blockBy: chat?.blockBy,
                  });
                }
                setState((pre) => {
                  return {
                    ...pre,
                    isLoading: false,
                  };
                });
              }
              return null;
            });
            if (res.data.data[0].userA.employeeId != userId) {
              setState((pre) => {
                return {
                  ...pre,
                  activeReciever: res.data.data[0].userA.employeeId,
                };
              });
            } else {
              setState((pre) => {
                return {
                  ...pre,
                  activeReciever: res.data.data[0].userB.employeeId,
                };
              });
            }

            ////start
            var chat_active = localStorage.getItem("activeChat");
            // debugger;
            if (chat_active) {
              let active;
              const findChat = res.data.data.find((item) => item.id == chat_active);
              if (findChat?.userA?.employeeId != userId) {
                active = findChat?.userA?.employeeId;
              } else {
                active = findChat?.userB?.employeeId;
              }
              var chatinfois = state.chatList.find((item) => item.chatroom_id == chat_active);
              setState((pre) => {
                return {
                  ...pre,
                  activeChat: chat_active,
                  activeReciever: active,
                };
              });
              // loadActiveChatMessage(
              //       token,
              //       counterRef.current.activeChat,
              //       userId
              //     );
            } else {
              chat_active = counterRef.current.activeChat;
              var chatinfois = state.chatList.find((item) => item.chatroom_id == chat_active);
              // loadActiveChatMessage(token, parseInt(chat_active), userId);
              setState({ isLoading: false });
            }

            store.connection?.on("CheckIsOnline", (userId, isOnline, lastSeen, status) => {
              //  console.log(userId, isOnline, lastSeen, status);
              if (userData.Id !== userId) {
                //  console.log("user is online now", userId);
                let newChatList = chatlist.map((chat, index) =>
                  chat.reciever == userId ? { ...chat, isOnline, lastSeen, status } : chat
                );
                if (status) {
                  loadActiveChatMessage(token, parseInt(chat_active), userData.Id);
                  setState((pre) => {
                    return {
                      ...pre,
                      chatList: newChatList,
                      msgseenstatus: status,
                    };
                  });
                }
                if (status !== "") {
                  chat_active = counterRef.current.activeChat;
                } else {
                  console.log("extra messages not ", chat_active);
                }
                setState((pre) => {
                  return {
                    ...pre,
                    chatList: newChatList,
                  };
                });
              }
            });

            store.connection.on("msgSeenStatus", (usrId, chatId, seen) => {
              chat_active = counterRef.current.activeChat;
              if (chatId == chat_active && userData.Id != usrId) {
                if (seen !== "") {
                  chat_active = counterRef.current.activeChat;
                } else {
                  console.log("extra messages seen not ", chat_active);
                }
              }
            });

            store.connection.on("CheckIsOnline", (userId, isOnline, status) => {});
            ////////
            setState((pre) => {
              return {
                ...pre,
                chatList: chatlist,
              };
            });
            var chat_active = localStorage.getItem("activeChat");
            //  loadActiveChatMessage(
            //   token,
            //   parseInt(chat_active),
            //   userId
            // );
          });

          //////end
          loadActiveChatMessage(token, parseInt(chat_active), userData.Id);
          connection.on("ReceiveMessage", (message, chat) => {
            const updatedChat = [...latestChat.current];
            if (message.sender != userData.Id) {
              message.isSender = false;
              message.status = "";
              if (counterRef.current.activeChat == message.chatInfoId) {
                updatedChat.push(message);
              }
              //setChat(updatedChat);
              connection.send("ActiveChat", message.reciever, chat.chatInfoId);
            } else {
              const status =
                message.readMsg == "Send"
                  ? "sent"
                  : message.readMsg == "Delivered"
                  ? "received"
                  : message.readMsg == "Seen" && "read";
              message.isSender = true;
              message.status = status;
              updatedChat.push(message);
              //setChat(updatedChat);
              connection.send("ActiveChat", message.reciever, chat.chatInfoId);
            }
            setChat(updatedChat);
          });
          loadActiveChatMessage(token, parseInt(chat_active), userData.Id);
          connection.on("msgSeenStatus", (usrId, chatId, seen) => {
            setState((pre) => {
              return {
                ...pre,
                CurrentReceivedmsgData: {
                  UserId: usrId,
                  chatid: chatId,
                  Seen: seen,
                },
              };
            });
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  // const loadChatListData =(token, userId)=>{
  //   console.log(userId);
  //   var token = localStorage.getItem("userData");
  //   const userData = jwt(token);

  // }
  const loadActiveChatMessage = (token, chatId, userId) => {
    api("get", `/api/v1/chat/GetMessages/${chatId}`).then((responseMessages) => {
      var messagelist = [];
      if (responseMessages.data.data.messages.length > 0) {
        responseMessages.data.data.messages.map((message) => {
          message = message;
          var messageObject;
          if (message?.sender != userId) {
            messageObject = {
              isSender: false,
              message: message.message,
              status: "",
            };
          } else {
            const status =
              message.readMsg == "Send"
                ? "sent"
                : message.readMsg == "Delivered"
                ? "received"
                : message.readMsg == "Seen" && "read";
            messageObject = {
              isSender: true,
              message: message.message,
              status: status,
            };
          }
          messagelist.push(messageObject);
          return null;
        });
        setChat(messagelist);
        connection && connection.send("activeChat", userId, chatId);
      } else {
        setChat([]);
      }
    });
  };
  const sendMessage = async (user, message) => {
    var token = localStorage.getItem("userData");
    var chat_active = localStorage.getItem("activeChat");
    const userData = jwt(token);
    const info = {
      Sender: parseInt(userData.Id),
      Reciever: state.activeReciever,
      message: message,
    };
    if (connection._connectionStarted) {
      try {
        await connection.send("SendMessage", info, info);
        //await connection.send('SendNotification', state.activeReciever);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  };
  const changeChat = (chat) => {
    var token = localStorage.getItem("userdata");
    localStorage.removeItem("activeChat");
    var chatListis = state.chatList;
    var index = chatListis?.indexOf(chatListis?.find((item) => item.chatroom_id == chat.chatroom_id));
    if (index != -1) {
      chatListis[index].unread = false;
      // this.setState({ chatList: chatListis });
      setState((pre) => {
        return {
          ...pre,
          chatList: chatListis,
        };
      });
    }
    setState((pre) => {
      return {
        ...pre,
        activeChat: chatListis[index]?.chatroom_id,
        activeReciever: chatListis[index]?.reciever,
        messageList: [],
        message: "",
        CurrentReceivedmsgData: {},
      };
    });
    updatestore({ chatactive: chatListis[index]?.chatroom_id });
    loadActiveChatMessage(token, chatListis[index]?.chatroom_id, state.userData?.Id);
  };
  return (
    <>
      <Box sx={{ display: "flex", height: "100%" }}>
        <ChatSideBarTwo
          handleClose={handleClose}
          state={state}
          chatList={state.chatList}
          chatChange={changeChat}
          chat={chat}
          activeChat={state.chatList?.find((chat) => chat?.chatroom_id == state.activeChat)}
        />
        <Box sx={{ width: "100%" }}>
          <ChatWindow
            handleClose={handleClose}
            chat={chat}
            status={state?.msgseenstatus}
            sendMessage={sendMessage}
            activeChat={state.chatList?.find((chat) => chat?.chatroom_id == state.activeChat)}
          />
          {/* <ChatSideTwo  
           /> */}
        </Box>
      </Box>
    </>
  );
};
export default IndexThree;
