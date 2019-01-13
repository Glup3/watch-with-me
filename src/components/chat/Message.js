import React from 'react';

const Message = ({ username, text }) => {
  return (
    <div className="message-container">
      <span className="blue-text">{ username }</span>
      <span className="white-text">{ text }</span>
    </div>
  );
}

export default Message