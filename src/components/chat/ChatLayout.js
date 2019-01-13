import React, { Component } from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import { SEND_MESSAGE } from '../../Constants';
import { Col, Row, Collapsible, CollapsibleItem } from 'react-materialize';
import UserList from './users/UserList';

export class ChatLayout extends Component {

  sendMassage = (message) => {
    this.props.socket.emit(SEND_MESSAGE, {
      username: this.props.username,
      text: message
    });
  }

  render() {
    return (
      <Collapsible>
        <CollapsibleItem header={"Online Users: " + this.props.users.length} icon="contacts" className="white-text">
          <UserList users={this.props.users}/>
        </CollapsibleItem>
        <CollapsibleItem header="Chat" icon="chat_bubble" className="white-text">
          <div>Your username: {this.props.username}</div>
          <div>Your room: {this.props.room}</div>
          <p></p>
          <Row>
            <Col s={12}>
              <MessageList messages={this.props.messages}/>
            </Col>
              <SendMessageForm className="myInput" sendMessage={this.sendMassage}/> 
          </Row>
        </CollapsibleItem>
      </Collapsible>
    )
  }
}

export default ChatLayout