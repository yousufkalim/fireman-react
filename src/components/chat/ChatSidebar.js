import React, { Component } from "react";
import Autocomplete from "react-autocomplete";
import { Translation } from "react-i18next";
import { Tooltip } from "antd";

export class ChatSideBar extends Component {
  render() {
    console.log("chatlist side ", this.props.activeChat);
    console.log("props.chatList",this.props.chatList);
    return (
      <Translation>
        {(t) => (
          <div className="chatSidebar">
            <div className="chatSidebar__info">
              <p>{t("Permispop Chat")}</p>
            </div>
            {/* <div className="chatSidebar__header">
            
              <Autocomplete
                items={this.props.searchList}
                getItemValue={(item) => item.chatroom_id}
                renderItem={(item, highlighted) => (
                  <div
                    key={item.chatroom_id}
                    style={{
                      backgroundColor: highlighted
                        ? "darkorange"
                        : "transparent",
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
                  placeholder: t("Search"),
                }}
                value={this.props.search}
                onChange={(e) => this.props.filterChats(e)}
                onSelect={(item) => this.props.selectChat(item)}
              />
              <i className="fa fa-search chatSidebar__search_icon"></i>
            </div> */}
           
            <div className="chatSidebar__body">
             
              <h6>{t("Recent Chats")}</h6>
          
              {console.log("props.chatList",this.props.chatList)}
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      // marginBottom: "-20px",
                    }}
                  >
                    <div
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      {chat.isOnline ? (
                        <Tooltip title={t("online")} color="rgb(40, 228, 56)">
                          <span className="chat_online"></span>
                        </Tooltip>
                      ) : (
                        <Tooltip title={t("offline")} color="orange">
                          <span className="chat_offline"></span>
                        </Tooltip>
                      )}
                      <div>
                        <p className="chat_user_name">{chat.chatroom_label}</p>
                        <small className="chat_user_role">
                          <Translation>{(t) => t(chat.user_role)}</Translation>
                        </small>
                      </div>
                    </div>
                    <a href={`/admin/user/${chat.reciever}`}>
                      <i class="fas fa-eye chat-view-btn"></i>
                    </a>
                  </div>
                  {chat.unread ? <span className="unread_chat"></span> : ""}
                </div>
              ))}
            </div>
          </div>
        )}
      </Translation>
    );
  }
}

export default ChatSideBar;