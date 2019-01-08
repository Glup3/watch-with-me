import React, { Component } from 'react'
import { Form, Button, FormGroup, Label, Input, Container, FormText } from 'reactstrap';

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
        <h1>Create or Join Room</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" id="username" placeholder="Your Username" onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="room">Room</Label>
            <Input type="text" name="room" id="room" placeholder="Room" onChange={this.handleChange}/>
          </FormGroup>
          <Button>Join Room</Button>
          <FormText>Creates a new room if it doesn't exist yet.</FormText>
        </Form>
      </Container>
    )
  }
}

export default NewRoomScreen
