import React, { Component } from 'react'
import { Row, Input, Button } from 'react-materialize'

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
      <Row>
        <h2 className="white-text">Create or join a room</h2>
        <form onSubmit={this.handleSubmit}>
          <Input className="white-text" placeholder="" label="Your username" s={12} required onChange={this.handleChange} id="username"/>
          <Input className="white-text" placeholder="" label="Room ID" s={12} required onChange={this.handleChange} id="room"/>
          <Button className="black">Submit</Button>
        </form>
      </Row>
    )
  }
}

export default NewRoomScreen
