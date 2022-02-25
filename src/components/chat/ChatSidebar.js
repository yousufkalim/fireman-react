import React, { Component } from "react";
import Autocomplete from "react-autocomplete";

export class ChatSideBar extends Component {
  render() {
    return (
      <div className="chatSidebar">
        <div className="chatSidebar__info">
          <p>Permispop Chat</p>
        </div>
        <div className="chatSidebar__header">
          {/* <input
            type="text"
            className="chatsidebar__search"
            placeholder="search.."
          /> */}
          <Autocomplete
            items={this.props.searchList}
            getItemValue={(item) => item.chatroom_id}
            renderItem={(item, highlighted) => (
              <div
                key={item.chatroom_id}
                style={{
                  backgroundColor: highlighted ? "darkorange" : "transparent",
                  padding: "10px",
                  color: highlighted ? "#fff" : "#149e7a",
                }}
              >
                {`${item.chatroom_label}(${item.user_role})`}
              </div>
            )}
            wrapperStyle={{
              display: "block",
            }}
            menuStyle={{
              zIndex: "10",
              borderRadius: "3px",
              position: "static",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
              background: "#fff",
              color: "#149e7a",
              padding: "2px 0",
              fontSize: "90%",
              overflow: "auto",
              maxHeight: "200px",
            }}
            inputProps={{
              className: "form-control",
              placeholder: "Search ...",
            }}
            value={this.props.search}
            onChange={(e) => this.props.filterChats(e)}
            onSelect={(item) => this.props.selectChat(item)}
          />
          <i className="fa fa-search chatSidebar__search_icon"></i>
        </div>
        <div className="chatSidebar__body">
          <h6>Recent Chats</h6>
          {this.props.chatList.map((chat) => (
            <div
              className={
                this.props.activeChat === chat.chatroom_id
                  ? "chatInfo activeChat"
                  : "chatInfo"
              }
              key={chat.chatroom_id}
              onClick={() => this.props.chatChange(chat)}
            >
              <p className="chat_user_name">{chat.chatroom_label}</p>
              <small className="chat_user_role">{chat.user_role}</small>
              {chat.unread ? <span className="unread_chat"></span> : ""}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ChatSideBar;