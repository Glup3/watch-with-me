import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { PLAY, PAUSE } from './Constants'

var io = require('socket.io-client')

class App extends Component {

  state = {
    socket: null,
    player: null,
  }

  componentWillMount() {
    const socket = io('http://localhost:5000');

    this.setState({
      socket
    })

    this.initSocket(socket);
  }

  initSocket = (socket) => {
    socket.on('connect', () => {
      console.log("Connected: ", socket.id);
    });

    socket.on('disconnect', () => {
      console.log("Disconnected")
    });

    socket.on(PLAY, () => {
      this.state.player.playVideo();
    });

    socket.on(PAUSE, () => {
      this.state.player.pauseVideo();
    });

  }

  onReady = (e) => {
    this.setState({
      player: e.target,
    })
    console.log("Youtube Player is ready");
  }

  onStateChanged = (e) => {
    
    switch (this.state.player.getPlayerState()) {
      case -1:
        console.log('STATUS -1');
        break; // NOT LOADED, DO NOTHING
      case 0:
        console.log('STATUS 0');
        break;
      case 1:
        console.log('STATUS 1');
        this.state.socket.emit(PLAY);
        break;
      case 2:
        console.log('STATUS 2');
        this.state.socket.emit(PAUSE);
        break;
      case 3:
        console.log('STATUS 3');
        break;
      case 5:
        console.log('STATUS 5');
        break;
    }

  }

  

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        controls: 2,
        rel: 0,
        modestbranding: 1,
        autoplay: 1,
      }
    }

    return (
      <div className="App">
          <YouTube 
            videoId="rTs4ZpM3xWs"
            opts={opts}
            onReady={this.onReady}
            onStateChange={this.onStateChanged}
            className="yt"
          />
      </div>
    );
  }
}

export default App;
