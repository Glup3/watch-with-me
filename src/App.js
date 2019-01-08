import React, { Component } from 'react';
import VideoScreen from './components/VideoScreen';
import NewRoomScreen from './components/NewRoomScreen';

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
    if (this.state.currentScreen === 'default') {
      return <NewRoomScreen onSubmit={this.onSubmit}/>
    }
    if (this.state.currentScreen === 'VideoScreen') {
      return <VideoScreen room={this.state.room} username={this.state.username}/>
    }
  }
}

export default App;
