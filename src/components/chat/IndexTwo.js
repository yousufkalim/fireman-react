import React from 'react'
import {  useEffect } from "react";
import useState from 'react-usestateref'
import ChatSidebar from "./ChatSidebar";
import ChatSide from "./ChatSide";
import NoChatSelected from "./NoChatSelected";
import { Translation } from "react-i18next";

import jwtDecode from "jwt-decode";
import { Base64 } from "js-base64";
import { Message } from "react-chat-ui";
import Loader from "./Loader";
import { HubConnectionBuilder } from "@microsoft/signalr";
import jwt from 'jwt-decode'
import api from "../../api/index";

//import * as SignalR from "@aspnet/signalr";
//import { ChatItem } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
const IndexTwo = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     messageList: [],
  //     chatList: [],
  //     userData: null,
  //     activeChat: "",
  //     activeReciever: "",
  //     message: "",
  //     search: "",
  //     searchList: [],
  //     isLoading: true,
  //     connection: "",
  //   };
  // }

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
    msglist:[]
  })
  
  useEffect(() => {
    var token = localStorage.getItem("userData");
    const userData = jwt(token);
    console.log("<>?",userData);
    console.log("<>??????",userData.Id)
    setState((pre)=>{
      return{
        ...pre,
        userData:userData
      }
    })
    // list all chat list
    loadChatListData(token, userData.Id);
  }, [])

  useEffect(() => {
    const hubConnection = new HubConnectionBuilder()
    // .withUrl("http://160.153.244.127:9093/chatHub")
    .withUrl("http://160.153.249.64:6164/chatHub")
    .withAutomaticReconnect()
    .build();
  //this.setState({ connection: hubConnection })
  setState((pre)=>{
    return{
     ...pre,
     connection: hubConnection 
    }
  })
  counterRef.current.connection
  .start()
  .then((res) => console.log("Connection started!", res))
  .catch((err) =>
    console.log("Error while establishing connection :(", err.message)
  )
  console.log("{}{}{<>><><><<86",counterRef.current.connection);
 }, [])
 useEffect(() => {
   console.log("state.connection",state.connection.connection);
  // state.connection
  //     .start()
  //     .then((res) => console.log("Connection started!", res))
  //     .catch((err) =>
  //       console.log("Error while establishing connection :(", err.message)
  //     );

  //   state.connection.on("ReceiveMessage", (user, message) => {
  //     console.log("message => ", message);
  //   });
 }, [])


 
 
 
  const loadChatListData = (token, userId) => {
    console.log("run localchatlistdata107");
    var token = localStorage.getItem("userData");
    const userData = jwt(token);
    const { chatList } = state;
  
    api("get", `/api/v1/chat/GetChatList/${userId}`).then((responseData) => {
        console.log("chatlist data ", responseData.data.data);
        console.log("86",responseData?.data?.data?.length);
        var chatList = [];
        // console.log("responseData", responseData);
        if (responseData && responseData?.data?.data?.length > 0) {
          responseData?.data?.data?.map((chat) => {
            var a = chat.userA
            var b = chat.userB
            console.log(a,"usera");
            console.log(b,"userb");
            console.log("userId",userId);
            console.log("a?.employeeId",a?.employeeId);
            console.log("b?.employeeId",b?.employeeId);
            console.log("userId",userId);
            if (a?.employeeId != userId) {
             console.log("user1.id");
             console.log("<>><>><", a);
             console.log("<>><>><", b);
              chatList.push({
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
              setState((pre)=>{
                return{
                 ...pre,
                 isLoading:false
                }
              })
            } else {
              if (b?.employeeId != userId) {
                console.log("user2.id");
                chatList.push({
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
              setState((pre)=>{
                return{
                 ...pre,
                 isLoading:false
                }
              })
            }
            return null;
          });
            console.log("chatList180",chatList);
            console.log("181",responseData.data.data);
            console.log("userId",userId);
          if (responseData.data.data[0].userA.employeeId !== userId) {
            console.log("useraaaaa");
            // this.setState({
            //   activeReciever: responseData.data.data[0].userA.employeeId,
            // });
            setState((pre)=>{
               return{
                 ...pre,
                 activeReciever: responseData.data.data[0].userA.employeeId,
               }
            })
          } else {
            console.log("userbbbbbbbbbb");
            // this.setState({
            //   activeReciever: responseData.data.data[0].userB.employeeId,
            // });
            setState((pre)=>{
              return{
                ...pre,
                activeReciever: responseData.data.data[0].userB.employeeId,
              }
            })
          }
          console.log("chat array ", chatList);
          console.log("statecheck", state);
          //  Block user
          counterRef.current.connection.on(
            "blockStatus",
            (userId, chatId, blockStatus) => {
              const { chatList, connection } = state;
              console.log("after block user int ", userId, chatId, blockStatus);
              const newChatList = chatList.map((chat) =>
                chat.chatroom_id === chatId
                  ? { ...chat, block: blockStatus, blockBy: userId }
                  : chat
              );
              console.log("after block check ", newChatList);
              // this.setState({ chatList: newChatList }, () => {
              //   console.log("after block user chatlist ", chatList);
              // });
              setState((pre)=>{
                return{
                 ...pre,
                 chatList: newChatList
                }
              })
              console.log("after block user in ", chatList);
              console.log("after block user int ", userId, chatId, blockStatus);
            }
          );

          setState((pre)=>{
            return{
              ...pre,
              chatList:chatList,
              activeChat: responseData?.data?.data[0]?.id 
            }
          })
          // setState(
          //   { chatList, activeChat: responseData?.data?.data[0]?.id }
          //   )
            // Show online when new user login

            var chat_active = parseInt(localStorage.getItem("activeChat"));
            console.log("chat_aaaaaactive ",chat_active);
            console.log("chatlist_active", state.chatList);
            // debugger;
            if (chat_active) {
              let active;
              console.log("?>><<<responseData.data.data",responseData.data.data);
              const findChat = responseData.data.data.find(
                (item) => item.id === chat_active
              );
              console.log("findChat",findChat);
              console.log("userId",userId);
              if (findChat?.userA?.employeeId !== userId) {
                active = findChat.userA.employeeId;
              } else {
                active = findChat.userB.employeeId;
              }
              console.log("find chat ", findChat);
              console.log("find chat active", active);
              var chatinfois = state.chatList.find(
                (item) => item.chatroom_id === chat_active
              );
               console.log("chatinfois", chatinfois);

              // this.setState(
              //   {
              //     activeChat: chat_active,
              //     activeReciever: active,
              //   })
                setState((pre)=>{
                  return{
                    ...pre,
                    activeChat: chat_active,
                    activeReciever: active,
                  }
                })
                 console.log(counterRef.current.activeChat);
                  loadActiveChatMessage(
                    token,
                    counterRef.current.activeChat,
                    userId
                  );
                
                 
            } else {
              chat_active = state.activeChat;
              var chatinfois = state.chatList.find(
                (item) => item.chatroom_id === chat_active
              );
              // console.log("chat_active", chat_active);

              loadActiveChatMessage(token, chat_active, userId);
              console.log("275", userId);
              console.log(state,"./,/,");
              //setState({ isLoading: false });
              setState((pre)=>{
               return{
                 ...pre,
                 isLoading: false 
               }
              })
            }
            console.log("284", state.userData );
            counterRef.current.connection.on(
              "checkIsOnline",
              (userId, isOnline, lastSeen, status) => {
                
                if ( userData.Id != userId) {
                  console.log("user is online now", userId);
                  // chatList.map((chat) => {
                  //   console.log("chat list => ", chat);
                  //   if (userId === chat.reciever) {
                  //     let newChatList = chatList.map((chat, index) =>
                  //       chat.reciever === userId
                  //         ? { ...chat, isOnline: true }
                  //         : chat
                  //     );

                  //     this.setState({ chatList: newChatList }, () => {
                  //       console.log("new chatlis ", chatList);
                  //       console.log("old chatlis ", newChatList);
                  //     });
                  //   }
                  // });

                  let newChatList = chatList.map((chat, index) =>
                    chat.reciever === userId
                      ? { ...chat, isOnline, lastSeen, status }
                      : chat
                  );

                  if (status !== "") {
                    console.log("extra messages", chat_active);
                    chat_active = state.activeChat;
                    loadActiveChatMessage(token, chat_active, userData.Id);
                  } else {
                    console.log("extra messages not ", chat_active);
                  }
                  //this.setState({ chatList: newChatList }) 
                  setState((pre)=>{
                   return{
                     ...pre,
                     chatList: newChatList
                   }
                  })
                    console.log("new chatlis ", chatList);
                    console.log("old chatlis ", newChatList);
                  
                }
              }
            );

            counterRef.current.connection.on("msgSeenStatus", (usrId, chatId, seen) => {
              chat_active = state.activeChat;
              if (chatId === chat_active && userData.Id !== usrId) {
                if (seen !== "") {
                  console.log("extra messages seen", chat_active);
                  chat_active = state.activeChat;
                  loadActiveChatMessage(token, chat_active, userData.Id);
                } else {
                  console.log("extra messages seen not ", chat_active);
                }
              }
            });
            // check props

            // add socketio listenrs
            // this.state.chatList.map((chat) => {
            // this.state.connection.on("ReceiveMessage", (user, message) => {
            //   console.log("message => ", message);
            // });
            counterRef.current.connection.on(
              "CheckIsOnline",
              (userId, isOnline, status) => {
                console.log("check online ", isOnline);
                console.log("check online id ", userId);
              }
            );

            counterRef.current.connection.on(`ReceiveMessage`, (msg, chat) => {
              // debugger;
              console.log("msg rec ", msg);
              console.log("msg rec2 ", chat);
              console.log("chat.chatInfoId",chat.chatInfoId);
              console.log("state.activeChat",state.activeChat);
              if (chat.chatInfoId === state.activeChat) {
                // const { message } = data;
                const { userData, messageList } = state;
                var messageObject;
                if (msg.sender != userData.Id) {
                  var chatinfo = state.chatList.find(
                    (item) => item.chatroom_id === chat.chatInfoId
                  );

                  console.log("chatlist if");
                  console.log("chatlist chatinfo", chatinfo);
                  messageObject = {
                    isSender: false,
                    message: msg.message,
                    status: "",
                  };
                  state.connection.send(
                    "activeChat",
                    msg.reciever,
                    chat.chatInfoId
                  );
                } else {
                  console.log("chatlist else");
                  const status =
                    msg.readMsg === "Send"
                      ? "sent"
                      : msg.readMsg === "Delivered"
                      ? "received"
                      : msg.readMsg === "Seen" && "read";
                  messageObject = {
                    isSender: true,
                    message: msg.message,
                    status: status,
                  };
                }
                // this.setState(
                //   {
                //     messageList: [...messageList, messageObject],
                //     message: "",
                //   })
                  setState((pre)=>{
                    return{
                      ...pre,
                      messageList: [...messageList, messageObject],
                      message: "",
                    }
                  })
                  console.log("callback setmessageList", messageList)
                
              } else {
                var chatis = state.chatList;
                var index = chatis.indexOf(
                  chatis.find((item) => item.chatroom_id === chat.id)
                );
                if (index != -1) {
                  chatis[index].unread = true;
                  setState((pre)=>{
                    return{
                     ...pre,
                     chatList: chatis
                    }
                  })
                  //this.setState({ chatList: chatis });
                }
              }
            });
            return null;
            // });
            // console.log("this.state.chatList", this.state.chatList);
          
        } else {
         
          setState((pre)=>{
            return{
              ...pre,
              isLoading: false
            }
           
          })
          //setState({ isLoading: false });
        }
      }
    );
  };

  console.log("statecheck", state);
  const loadActiveChatMessage = (token, chatId, userId)=>{
    console.log("active chat messages ", chatId);
    console.log("userid", userId);
    api("get", `/api/v1/chat/GetMessages/${chatId}`).then((responseMessages) => {
        console.log("active chat ", responseMessages);
        var messagelist = [];
        if (responseMessages.data.data.messages.length > 0) {
          responseMessages.data.data.messages.map((message) => {
            message = message;
            var messageObject;

            if (message.sender !== userId) {
              messageObject = {
                isSender: false,
                message: message.message,
                status: "",
              };
            } else {
              const status =
                message.readMsg === "Send"
                  ? "sent"
                  : message.readMsg === "Delivered"
                  ? "received"
                  : message.readMsg === "Seen" && "read";

              messageObject = {
                isSender: true,
                message: message.message,
                status: status,
              };
            }
            messagelist.push(messageObject);
            return null;
          });
              setState((pre)=>{
               return{
                 ...pre,
                 messageList:messagelist
               }
              })
              console.log("state",state)
      console.log("state.connection",state.connection);
      
      counterRef.current.connection.send("activeChat", parseInt(userId), chatId);
         
        }
      }
    );
  };
 
  const sendMessage = (e) => {
    e.preventDefault();
    const { activeReciever, message, userData } = state;
    const info = {
      Sender: parseInt(userData.Id),
      Reciever: activeReciever,
      Message: message,
    };
    if (message !== "") {
      window.socket.emit("sendMessage", info);
    }
  };

  const sendMessages = async (e) => {
    e.preventDefault();
    const { activeReciever, message, userData } = state;
    // const _existingMessages = [
    //   ...state.messageList,
    //   {
    //     isSender: true,
    //     message: message,
    //     status: 'sent'
    //   }
    // ];
    // console.log(_existingMessages);
    // setState((pre)=>{
    //   return{
    //     ...pre,
    //     messageList: _existingMessages
    //   }
    // });
    console.log("use",userData);
    const info = {
      Sender: parseInt(userData.Id),
      Reciever: activeReciever,
      Message: message,
    };
    const user = "Azeem";
    // const message = "Helloo";
    const { connection } = state;
    console.log("message sent ", connection._connectionStarted);
    if (connection._connectionStarted && message) {
      console.log("hit");
      console.log("info", info);
      try {
        console.log("info", info);
        await connection.send("SendMessage", info, info);
        // await connection.send("MessageSent", info, info);
        await connection.send("SendNotification", activeReciever);
      } catch (e) {
        console.log(e);
      }
    } else {
      // alert("No connection to server yet.");
      console.log("No connection to server yet.");
    }
  };
  const changeChat = (chat) => {
    var token = localStorage.getItem("userdata");
    localStorage.removeItem("activeChat");
    var chatListis = state.chatList;
    var index = chatListis.indexOf(
      chatListis.find((item) => item.chatroom_id === chat.chatroom_id)
    );
    if (index != -1) {
      chatListis[index].unread = false;
      // this.setState({ chatList: chatListis });
      setState((pre)=>{
       return{
         ...pre,
         chatList: chatListis
       }
      })
    }
    // setState(
    //   {
    //     activeChat: chatListis[index].chatroom_id,
    //     activeReciever: chatListis[index].reciever,
    //     messageList: [],
    //     message: "",
    //   })
     setState((pre)=>{
       return{
         ...pre,
         activeChat: chatListis[index].chatroom_id,
         activeReciever: chatListis[index].reciever,
         messageList: [],
         message: "",
       }
     })
        console.log("connection signalr ", state.connection);
        loadActiveChatMessage(
          token,
          chatListis[index].chatroom_id,
          state.userData.Id
        );
      
    
  };

  const changeMessage = (e) => {
    //this.setState({ message: e.target.value });

    setState((pre)=>{
      return{
        ...pre,
        message: e.target.value
      }
    })
  };

 const blockUser = (block) => {
    console.log("block user  ", state.userData.Id);
    console.log("block user chat ", state.activeChat);
    const { connection, userData, activeChat } = state;
    const blockStatus = block;
    connection.send("blockUser", state.userData.Id, activeChat, blockStatus);
  };
 const filterChats = (e) => {
    this.setState({ search: e.target.value })
      // make filtering here
      if (this.state.search) {
        var filterChat = state.chatList.filter((item) =>
          item.chatroom_label
            .toLowerCase()
            .includes(state.search.toLocaleLowerCase())
        );
        //this.setState({ searchList: filterChat });
        setState((pre)=>{
          return{
            ...pre,
            searchList: filterChat
          }
        })
      } else {
        //this.setState({ searchList: [] });
        setState((pre)=>{
          return{
           ...pre,
           searchList: []
          }
        })
      }
    
  };

 const selectChat = (id) => {
    var findChat = state.searchList.find(
      (item) => item.chatroom_id === id
    );
    //this.setState({ searchList: [], search: "" }) 
    setState((pre)=>{
      return{
        ...pre,
        searchList: [], 
        search: ""
      }
    
    })
      if (findChat) changeChat(findChat);
    // on select function clicked find that chat id and call fuction changeChat
  };
  return (
    <>

    
 <Translation>
        {(t) => (
          <div className="chatApp">
            
            <div className="chatApp__body">
              <ChatSidebar
                chatList={state.chatList}
                chatChange={changeChat}
                activeChat={state.activeChat}
                selectChat={selectChat}
                filterChats={filterChats}
                search={state.search}
                searchList={state.searchList}
              />
              {state.activeChat ? (
                <ChatSide
                  messageList={state.messageList}
                
                  sendMessage={sendMessage}
                  sendMessages={sendMessages}
                  changeMessage={changeMessage}
                  currentUser={state.userData.Id}
                  messageValue={state.message}
                  blockUser={blockUser}
                  activeChat={state.chatList.find(
                    (chat) => chat.chatroom_id ===state.activeChat
                  )}
                />
              ) : state.isLoading ? (
                <Loader isLoading={true} />
              ) : (
                <NoChatSelected />
              )}
            </div>
          </div>
        )}
      </Translation>

    </>
  )
}

export default IndexTwo