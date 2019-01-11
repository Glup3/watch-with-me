import React from 'react';

const Message = ({ username, text }) => {
  return (
    <div>
      <div>{ username }</div>
      <div>{ text }</div>
    </div>
  );
}

export default Message