import React, { Component } from 'react';
import { Input } from 'react-materialize'

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
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input s={12} className="white-text" placeholder="Type your message" id="message" onChange={this.handleChange} value={this.state.message} />
      </form>
    )
  }
}

export default SendMessageForm
