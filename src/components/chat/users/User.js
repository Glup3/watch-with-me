import React from 'react';

const User = ({ username }) => {
  return (
    <div>
      <div className="blue-text">{ username }</div>
    </div>
  );
}

export default User