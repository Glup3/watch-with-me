import React, { Component } from 'react';
import { Row, Input, Button, Col } from 'react-materialize';

class NewRoomScreen extends Component {

  state = {
    room: '',
    username: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.username, this.state.room);
  }

  handleRoomNameClick = (e) => {
    this.setState({
      room: this.createRandomRoomName()
    })
  }

  createRandomRoomName = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 16; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  render() {
    return (
      <Row>
        <h2 className="white-text">Create or join a room</h2>
        <form onSubmit={this.handleSubmit}>
          <Input className="white-text" placeholder="" s={12} label="Your username" value={this.state.username} required onChange={this.handleChange} id="username"/>
          <Input className="white-text" placeholder="" s={12} label="Room ID" required value={this.state.room} onChange={this.handleChange} id="room"/>
          <Col>
            <Button className="black">Submit</Button>
          </Col>
        </form>
        <Button className="black" onClick={this.handleRoomNameClick}>Random room name</Button>
      </Row>
    )
  }
}

export default NewRoomScreen
