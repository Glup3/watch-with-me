import React, { Component } from 'react';
import VideoScreen from './components/VideoScreen';
import NewRoomScreen from './components/NewRoomScreen';
import { Container } from 'react-materialize';

class App extends Component {

  state = {
    username: '',
    room: '',
    currentScreen: 'default',
  }

  onSubmit = (username, room) => {
    this.setState({
      username,
      room,
      currentScreen: 'VideoScreen'
    })
  }

  render() {
    var screen;
    if (this.state.currentScreen === 'default') {
      screen = <NewRoomScreen onSubmit={this.onSubmit}/>
    }
    if (this.state.currentScreen === 'VideoScreen') {
      screen = <VideoScreen room={this.state.room} username={this.state.username}/>
    }

    return (
      <Container >
        {screen}
      </Container>
    )
  }
}

export default App;
