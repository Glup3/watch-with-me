import React, { Component } from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import { SEND_MESSAGE, JOIN_ROOM, RECEIVED_MESSAGE } from '../../Constants';

const io = require('socket.io-client')
const socketUrl = process.env.REACT_APP_SOCKET_URL || "/";

export class ChatLayout extends Component {

  state = {
    messages: [
      {username: 'user1', text:'Hi'},
      {username: 'user2', text:'Servas'},
      {username: 'user1', text:'Wie gehts wie stehts?'},
    ],
    socket: null,
  }

  componentDidMount() {
    const socket = io(socketUrl);
      this.setState({
        socket: socket
      })
    this.initSocket(socket);
  }

  initSocket = (socket) => {
    socket.on('connect', () => {
      socket.emit(JOIN_ROOM, this.props.room);
    });

    socket.on(RECEIVED_MESSAGE, (data) => {
      this.setState({
        messages: [...this.state.messages, {
          username: data.username,
          text: data.text
        }]
      })
    });

  }

  sendMassage = (message) => {
    this.state.socket.emit(SEND_MESSAGE, {
      username: this.props.username,
      text: message
    });
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <SendMessageForm sendMessage={this.sendMassage}/>
      </div>
    )
  }
}

export default ChatLayout
