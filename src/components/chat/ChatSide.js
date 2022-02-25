import React, { useRef, useEffect } from "react";
import { ChatFeed, Message } from "react-chat-ui";

const ChatSide = (props) => {
  const messagesEnd = useRef(null);

  useEffect(() => {
    const node = messagesEnd.current;
    // console.log(node);
    const height = node.clientHeight;
    // console.log(height);
    node.scroll({
      top: height,
      behavior: "smooth",
    });
  }, [props.messageList]);

  return (
    <div className="chatSide">
      <div className="chatSide__header">
        <p>{props.activeChat && props.activeChat.chatroom_label}</p>
        <small>{props.activeChat && props.activeChat.user_role}</small>
      </div>
      <div className="ChatContent">
        <div className="chatSide__body" ref={messagesEnd}>
          <ChatFeed
            messages={props.messageList}
            isTyping={false}
            hasInputField={false}
            showSenderName={false}
            bubblesCentered={false}
            bubbleStyles={{
              text: {
                fontSize: 12,
              },
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
          />
        </div>
        {/* div footer */}
        <div className="chatSide__footer">
          <form className="chatSide__form" onSubmit={props.sendMessage}>
            <input
              type="text"
              placeholder="send message"
              className="chat"
              onChange={props.changeMessage}
              value={props.messageValue}
            />
            <i className="fa fa-paper-plane" onClick={props.sendMessage}></i>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatSide;