import React, { Component } from 'react'

export class NewRoomScreen extends Component {

  state = {
    room: '',
    username: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.username, this.state.room);
  }

  render() {
    return (
      <div>
        <h1>Create or join room</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="roomname" id="room" onChange={this.handleChange} />
          <input type="text" placeholder="username" id="username" onChange={this.handleChange} />
          <button>Create/Join</button>
        </form>
      </div>
    )
  }
}

export default NewRoomScreen
