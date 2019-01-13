import React from 'react'
import User from './User';

const UserList = ({ users }) => {
  return (
    <div className="user-list">
      {users.map((user, index) => {
        return (
          <User key={index} username={user} />
        )
      })}
    </div>
  )
}

export default UserList