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

  render() {
    return (
      <Row>
        <h2 className="white-text">Create or join a room</h2>
        <form onSubmit={this.handleSubmit}>
          <Input className="white-text" placeholder="" s={12} label="Your username" required onChange={this.handleChange} id="username"/>
          <Input className="white-text" placeholder="" s={12} label="Room ID" required onChange={this.handleChange} id="room"/>
          <Col>
            <Button className="black">Submit</Button>
          </Col>
        </form>
      </Row>
    )
  }
}

export default NewRoomScreen
