import React, { Component } from 'react';
import Input from 'react-materialize/lib/Input';

class SendMessageForm extends Component {

  state = {
    message: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <form>
        <Input placeholder="Type your message" id="message" />
      </form>
    )
  }
}

export default SendMessageForm
