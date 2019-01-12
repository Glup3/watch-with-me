import React, { Component } from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import { SEND_MESSAGE, JOIN_ROOM, RECEIVED_MESSAGE } from '../../Constants';
import { Col, Row, Collapsible, CollapsibleItem } from 'react-materialize';
import UserList from './users/UserList';

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
    users: [
      {username: 'ich'},
      {username: 'du'},
      {username: 'er'},
      {username: 'max'},
    ]
  }

  componentDidMount() {
    const socket = io(socketUrl);
    this.setState({socket});
    this.initSocket(socket);
  }

  initSocket = (socket) => {
    socket.on('connect', () => {
      socket.emit(JOIN_ROOM, this.props.room);

      const message = this.props.username + " joined the room.";
      socket.emit(SEND_MESSAGE, {
        username: 'Server Notification',
        text: message
      })
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
      <Collapsible>
        <CollapsibleItem header={"Online Users: " + this.state.users.length} icon="contacts" className="white-text">
          <UserList users={this.state.users}/>
        </CollapsibleItem>
        <CollapsibleItem header="Open Chat" icon="chat_bubble" className="white-text">
          <div>Your username: {this.props.username}</div>
          <Row>
            <Col s={12}>
              <MessageList messages={this.state.messages}/>
            </Col>
              <SendMessageForm className="myInput" sendMessage={this.sendMassage}/> 
          </Row>
        </CollapsibleItem>
      </Collapsible>
    )
  }
}

export default ChatLayout
