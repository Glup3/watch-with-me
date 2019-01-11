import React, { Component } from 'react'
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';

export class ChatLayout extends Component {

  state = {
    messages: []
  }

  handleSendSubmit = (e) => {
    
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <SendMessageForm onSubmit={this.handleSendSubmit}/>
      </div>
    )
  }
}

export default ChatLayout
