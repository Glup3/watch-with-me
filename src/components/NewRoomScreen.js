import React, { Component } from 'react'
import { Row, Input, Container } from 'react-materialize'
import Button from 'react-materialize/lib/Button';

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
      <Container>
        <Row>
          <h2>Create or join a room</h2>
          <form onSubmit={this.handleSubmit}>
            <Input label="Username" s={12} required onChange={this.handleChange} id="username"/>
            <Input label="Room" s={12} required onChange={this.handleChange} id="room"/>
            <Button>Submit</Button>
          </form>
        </Row>
      </Container>
    )
  }
}

export default NewRoomScreen
