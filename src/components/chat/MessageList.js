import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => {
  return (
    <div className="chat-container">
      {messages.map((message, index) => {
        return (
          <Message key={index} username={message.username} text={message.text}/>
        )
      })}
    </div>
  );
}

export default MessageList