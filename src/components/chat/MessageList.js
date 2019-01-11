import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => {
  return (
    <div>
      {messages.map((message, index) => {
        return (
          <Message key={index} username={message.username} text={message.text}/>
        )
      })}
    </div>
  );
}

export default MessageList