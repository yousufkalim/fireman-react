import React, { Component } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatSide from "./ChatSide";
import NoChatSelected from "./NoChatSelected";
// import WebServicesManager from "../WebServicesManager/WebServicesManager";
import jwtDecode from "jwt-decode";
import { Base64 } from "js-base64";
import { Message } from "react-chat-ui";
// import Loader from "./Loader";

export class ChatView extends Component {
  //WebServicesManager = new WebServicesManager();
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      chatList: [],
      userData: null,
      activeChat: "",
      activeReciever: "",
      message: "",
      search: "",
      searchList: [],
      isLoading: true,
    };
  }

  componentWillMount() {
    var token = localStorage.getItem("userdata");
    var decoded = jwtDecode(token);
    var userData = JSON.parse(Base64.decode(decoded.userData));
    this.setState({ userData });
    // list all chat list
    this.loadChatListData(token, userData.id);
  }

  // load messages

  loadChatListData = (token, userId) => {
    this.WebServicesManager.getApiWithParamCall(
      {
        endPoint: "Chat/GetChatList",
        dataToFetch: userId,
        token,
      },
      (statusCode, responseData) => {
        var chatList = [];
        if (responseData.length > 0) {
          responseData.map((chat) => {
            var user1 = JSON.parse(chat.userA);
            var user2 = JSON.parse(chat.userB);
            // debugger;
            if (user1.id !== userId) {
              chatList.push({
                chatroom_id: chat.id,
                chatroom_label: `${user1.firstName} ${user1.surName}`,
                user_role: user1.role,
                reciever: user1.id,
                unread: false,
              });
              this.setState({ isLoading: false });
            } else {
              chatList.push({
                chatroom_id: chat.id,
                chatroom_label: `${user2.firstName} ${user2.surName}`,
                user_role: user2.role,
                reciever: user2.id,
                unread: false,
              });
              this.setState({ isLoading: false });
            }
          });
          // debugger;
          if (JSON.parse(responseData[0].userA).id !== userId) {
            this.setState({
              activeReciever: JSON.parse(responseData[0].userA).id,
            });
          } else {
            this.setState({
              activeReciever: JSON.parse(responseData[0].userB).id,
            });
          }
          this.setState({ chatList, activeChat: responseData[0].id }, () => {
            // check props
            var chat_active = localStorage.getItem("activeChat");
            if (chat_active) {
              var chatinfois = this.state.chatList.find(
                (item) => item.chatroom_id === chat_active
              );
              this.setState(
                {
                  activeChat: chat_active,
                  activeReciever: chatinfois.reciever,
                },
                () => {
                  this.loadActiveChatMessage(
                    token,
                    this.state.activeChat,
                    userId
                  );
                }
              );
            } else {
              chat_active = this.state.activeChat;
              this.loadActiveChatMessage(token, chat_active, userId);
              this.setState({ isLoading: false });
            }
            // add socketio listenrs
            this.state.chatList.map((chat) => {
              window.socket.on(`recieveMessage${chat.chatroom_id}`, (data) => {
                if (data.chat.id === this.state.activeChat) {
                  const { message } = data;
                  const { userData, messageList } = this.state;
                  var messageObject;
                  if (message.Sender !== userData.id) {
                    var chatinfo = this.state.chatList.find(
                      (item) => item.chatroom_id === data.chat.id
                    );
                    messageObject = new Message({
                      id: 1,
                      message: message.Message,
                      senderName: chatinfo.chatroom_label,
                    });
                  } else {
                    messageObject = new Message({
                      id: 0,
                      message: message.Message,
                    });
                  }
                  this.setState({
                    messageList: [...messageList, messageObject],
                    message: "",
                  });
                } else {
                  var chatis = this.state.chatList;
                  var index = chatis.indexOf(
                    chatis.find((item) => item.chatroom_id === data.chat.id)
                  );
                  if (index !== -1) {
                    chatis[index].unread = true;
                    this.setState({ chatList: chatis });
                  }
                }
              });
            });
          });
        } else {
          console.log("No Chat List Found");
          this.setState({ isLoading: false });
        }
      }
    );
  };

  loadActiveChatMessage = (token, chatId, userId) => {
    this.WebServicesManager.getApiCall(
      {
        endPoint: `Chat/GetMessages/?chatId=${chatId}`,
        token,
      },
      (statusCode, responseMessages) => {
        var messageList = [];
        if (responseMessages.messages.length > 0) {
          responseMessages.messages.map((message) => {
            message = JSON.parse(message);
            var messageObject;
            if (message.sender !== userId) {
              messageObject = new Message({
                id: 1,
                message: message.message,
              });
            } else {
              messageObject = new Message({
                id: 0,
                message: message.message,
              });
            }
            messageList.push(messageObject);
          });
          this.setState({ messageList });
        }
      }
    );
  };

  componentDidMount() {
    // window.
    // socket = io(ENDPOINT);
    if (window.socket) {
      window.socket.on(`new_message_5fb373d710d7ea35b4b8f0e5`, (message) => {
        window.alert(message);
      });
    }
  }

  componentWillUnmount() {
    localStorage.removeItem("activeChat");
  }

  sendMessage = (e) => {
    e.preventDefault();
    const { activeReciever, message, userData } = this.state;
    const info = {
      Sender: userData.id,
      Reciever: activeReciever,
      Message: message,
    };
    if (message !== "") {
      window.socket.emit("sendMessage", info);
    }
  };

  changeChat = (chat) => {
    var token = localStorage.getItem("userdata");
    localStorage.removeItem("activeChat");
    var chatListis = this.state.chatList;
    var index = chatListis.indexOf(
      chatListis.find((item) => item.chatroom_id === chat.chatroom_id)
    );
    if (index !== -1) {
      chatListis[index].unread = false;
      this.setState({ chatList: chatListis });
    }
    this.setState(
      {
        activeChat: chatListis[index].chatroom_id,
        activeReciever: chatListis[index].reciever,
        messageList: [],
        message: "",
      },
      () => {
        console.log(this.state);
        this.loadActiveChatMessage(
          token,
          chatListis[index].chatroom_id,
          this.state.userData.id
        );
      }
    );
  };

  changeMessage = (e) => {
    this.setState({ message: e.target.value });
  };

  filterChats = (e) => {
    this.setState({ search: e.target.value }, () => {
      // make filtering here
      if (this.state.search) {
        var filterChat = this.state.chatList.filter((item) =>
          item.chatroom_label
            .toLowerCase()
            .includes(this.state.search.toLocaleLowerCase())
        );
        this.setState({ searchList: filterChat });
      } else {
        this.setState({ searchList: [] });
      }
    });
  };

  selectChat = (id) => {
    var findChat = this.state.searchList.find(
      (item) => item.chatroom_id === id
    );
    this.setState({ searchList: [], search: "" }, () => {
      if (findChat) this.changeChat(findChat);
    });
    // on select function clicked find that chat id and call fuction changeChat
  };

  render() {
    return (
      <div className="chatApp">
        {/* sidebar */}
        <div className="chatApp__body">
          <ChatSidebar
            chatList={this.state.chatList}
            chatChange={this.changeChat}
            activeChat={this.state.activeChat}
            selectChat={this.selectChat}
            filterChats={this.filterChats}
            search={this.state.search}
            searchList={this.state.searchList}
          />
          {this.state.activeChat ? (
            <ChatSide
              messageList={this.state.messageList}
              sendMessage={this.sendMessage}
              changeMessage={this.changeMessage}
              messageValue={this.state.message}
              activeChat={this.state.chatList.find(
                (chat) => chat.chatroom_id === this.state.activeChat
              )}
            />
          ) : (

            <div> ...loading </div>
            // <div className="loading">
            //   {this.state.isLoading ? (
            //     <Loader isLoading={true} />
            //   ) : (
            //     <NoChatSelected />
            //   )}
            // </div>
          )}
        </div>
        {/* moment(new Date(1605596088).toISOString()).format("DD/MM/YYYY HH:mm") */}
      </div>
    );
  }
}

export default ChatView;