import React from 'react';

const Message = ({ username, text }) => {
  return (
    <div>
      <div className="blue-text">{ username }</div>
      <div className="white-text">{ text }</div>
    </div>
  );
}

export default Message