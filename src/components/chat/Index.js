import React from 'react'
import ChatSideTwo from './ChatSideTwo'
import {  useEffect, useRef } from "react";
import useState from 'react-usestateref'
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ChatWindow from './ChatWindow'
import jwt from 'jwt-decode'
import api from "../../api/index";
import ChatSideBarTwo from './ChatSideBarTwo'
import Box from "@mui/material/Box";
const Index = () => {
  const [state, setState] = useState({
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
  const [ connection, setConnection,counterRef ] = useState(null);
  const [ chat, setChat ] = useState([]);
  const latestChat = useRef(null);
  latestChat.current = chat;
 
 useEffect(() => {
  const newConnection = new HubConnectionBuilder()
  .withUrl("http://160.153.249.64:6164/chatHub")
      .withAutomaticReconnect()
      .build();

  setConnection(newConnection);
}, []);

useEffect(() => {
  console.log("connection",connection);
  if (connection) {
      connection.start()
          .then(result => {
              console.log('Connected!');
              var token = localStorage.getItem("userData");
              const userData = jwt(token);
              const userId=userData.Id
              api("get",`/api/v1/chat/GetChatList/${userData.Id}`).then((res)=>{
                console.log("chat res", res.data.data);
                var chatlist = [];
                res?.data?.data?.map((chat) => {
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
                   setState((pre)=>{
                     return{
                      ...pre,
                      isLoading:false
                     }
                   })
                 } else {
                   if (b?.employeeId != userId) {
                     console.log("user2.id");
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
                   setState((pre)=>{
                     return{
                      ...pre,
                      isLoading:false
                     }
                   })
                 }
             console.log("chatlist",chatlist);    
                 return null;
               });
               console.log("res?.data?.data",res?.data?.data);
               console.log("res?.data?.data[0].userA.employeeId",res?.data?.data[0].userA.employeeId);
               console.log(userId);
               if (res?.data?.data[0].userA.employeeId != userId) {
                 setState((pre)=>{
                   return{
                     ...pre,
                  activeReciever:res?.data?.data[0].userA.employeeId
                   }
                 })
               } else {
                 setState((pre)=>{
                   return{
                     ...pre,
                  activeReciever:res?.data?.data[0].userB.employeeId
                   }
                 })
               }
               console.log("chatList",chatlist);
               // this.state.connection.on(
               //   "blockStatus",
               //   (userId, chatId, blockStatus) => {
               //     const { chatList, connection } = this.state;
               //     console.log("after block user int ", userId, chatId, blockStatus);
               //     const newChatList = chatList.map((chat) =>
               //       chat.chatroom_id === chatId
               //         ? { ...chat, block: blockStatus, blockBy: userId }
               //         : chat
               //     );
               //     console.log("after block check ", newChatList);
               //     this.setState({ chatList: newChatList }, () => {
               //       console.log("after block user chatlist ", chatList);
               //     });
               //     console.log("after block user in ", chatList);
               //     console.log("after block user int ", userId, chatId, blockStatus);
               //   }
               // );
               console.log("id", res?.data?.data?.id);
               setState((pre)=>{
                 return{
                 ...pre,
                 activeChat:res?.data?.data?.id
                 }
               })
                 // { activeChat: responseData[0]?.id }
               setState((pre)=>{
                 return{
                   ...pre,
                   chatList:chatlist
                 }
               })
                var chat_active = parseInt(localStorage.getItem("activeChat"));
                console.log("chat_active",chat_active);
                if (chat_active) {
                 let active;
                 const findChat = res?.data?.data.find(
                   (item) => item.id === chat_active
                 );
                 console.log("findChat",findChat);
                 if (findChat.userA.employeeId !== userId) {
                   active = findChat.userA.employeeId;
                 } else {
                   active = findChat.userB.employeeId;
                 }
                 console.log("find chat ", findChat);
                 console.log("find chat active", active);
                 var chatinfois = state.chatList.find(
                   (item) => item.chatroom_id === chat_active
                 );
                 // console.log("chatinfois", chatinfois);
             
                
             
             
                 setState((pre)=>{
                   return{
                     ...pre,
                     activeChat: chat_active,
                     activeReciever: active
                   }
                 })
                 loadActiveChatMessage(
                   token,
                   state.activeChat,
                   userId
                 );
               } else {
                 chat_active = state.activeChat;
                 var chatinfois = state.chatList.find(
                   (item) => item.chatroom_id === chat_active
                 );
                 // console.log("chat_active", chat_active);
             
                 this.loadActiveChatMessage(token, chat_active, userId);
                 this.setState({ isLoading: false });
               }
             //console.log("userId, isOnline, lastSeen, status",userId, isOnline, lastSeen, status);
              connection.on(
                 "checkIsOnline",
                 (userId, isOnline, lastSeen, status) => {
                   if (userData.Id !== userId) {
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
             
                     let newChatList = chatlist.map((chat, index) =>
                       chat.reciever == userId
                         ? { ...chat, isOnline, lastSeen, status }
                         : chat
                     );
             
                     if (status !== "") {
                       console.log("extra messages", chat_active);
                       chat_active = this.state.activeChat;
                       this.loadActiveChatMessage(token, chat_active, userData.Id);
                     } else {
                       console.log("extra messages not ", chat_active);
                     }
             
                     setState({ chatList: newChatList }
                       
                       );
                   }
                 }
               );
             
               connection.on("msgSeenStatus", (usrId, chatId, seen) => {
                 chat_active = this.state.activeChat;
                 if (chatId === chat_active && userData.Id !== usrId) {
                   if (seen !== "") {
                     console.log("extra messages seen", chat_active);
                     chat_active = this.state.activeChat;
                     this.loadActiveChatMessage(token, chat_active, userData.Id);
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
              connection.on(
                 "CheckIsOnline",
                 (userId, isOnline, status) => {
                   console.log("check online ", isOnline);
                   console.log("check online id ", userId);
                 }
               );
                loadActiveChatMessage(
                 token,
                 chat_active,
                 userId
               );
             
               })
              connection.on('ReceiveMessage', (message, chat) => {
                  console.log("message", message);
                  console.log("message", chat);
                  const updatedChat = [...latestChat.current];
                  if(userData.Id!=message.sender){
                    message.isSender=false;
                    message.status=""
                    updatedChat.push(message);
                    connection.send("activeChat", message.reciever, chat.chatInfoId)

                  }
                  else{
                    const status =
                    message.readMsg == "Send"
                      ? "sent"
                      : message.readMsg == "Delivered"
                      ? "received"
                      : message.readMsg == "Seen" && "read";
                    message.isSender=true;
                    message.status=status
                    updatedChat.push(message);
                  }
                  setChat(updatedChat);
              });

               connection.on("msgSeenStatus", (usrId, chatId, seen) => {

                console.log(">?<><><><",usrId, chatId, seen);
               })
                
          })
          .catch(e => console.log('Connection failed: ', e));
  }
}, [connection]);
useEffect(() => {
  var token = localStorage.getItem("userData");
  var chat_active = localStorage.getItem("activeChat");
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
  loadChatListData(token, userData.Id, chat_active);
 
}, [])

const loadChatListData =(token, userId)=>{
  console.log("run localchatlistdata107");
  console.log(userId);
  var token = localStorage.getItem("userData");
  const userData = jwt(token);
  

}
const loadActiveChatMessage = (token, chatId, userId)=>{
  
  console.log("chatId",chatId);
  api("get", `/api/v1/chat/GetMessages/${chatId}`).then((responseMessages)=>{
    console.log("active chat ", responseMessages);
    var messagelist = [];
    if (responseMessages.data.data.messages.length > 0) {
      responseMessages.data.data.messages.map((message) => {
        message = message;
        var messageObject;

        if (message.sender != userId) {
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
          setChat(messagelist)
          console.log("state",state)
  console.log("state.connection",state.connection);
    }
  })
}
const sendMessage = async (user, message) => {
  var token = localStorage.getItem("userData");
  var chat_active = localStorage.getItem("activeChat");
  const userData = jwt(token);
  console.log(user,message);
 
  const info = {
    Sender: parseInt(userData.Id),
    Reciever: state.activeReciever,
    message: message,
  };
  if (connection._connectionStarted) {
    
    console.log("hit",info);
      try {
          await connection.send('SendMessage', info, info);
      }
      catch(e) {
          console.log(e);
      }
  }
  else {
      alert('No connection to server yet.');
  }
}
const changeChat = (chat) => {
  console.log("chatchange", chat);

  var token = localStorage.getItem("userdata");
  localStorage.removeItem("activeChat");
  var chatListis = state.chatList;
  var index = chatListis.indexOf(
    chatListis.find((item) => item.chatroom_id == chat.chatroom_id)
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
      localStorage.setItem("activeChat",  chatListis[index].chatroom_id);
      console.log("activeReciever",state.activeReciever);
      loadActiveChatMessage(
        token,
        chatListis[index].chatroom_id,
        state.userData.Id
      );
    
  
};

  return (
    <>
     <Box sx={{display:"flex"}}>  

       <ChatSideBarTwo
        chatList={state.chatList}
        chatChange={changeChat}
       />
          <Box sx={{width:'100%'}}> 
           <ChatWindow chat={chat}/>
           <ChatSideTwo sendMessage={sendMessage} />
          </Box>
          
        </Box>
    </>
  )
}

export default Index