import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { PLAY, PAUSE, SEEK_OTHER, ASK_FOR_TIME, SYNC_TIME } from './Constants'

var io = require('socket.io-client')

class App extends Component {

  state = {
    socket: null,
    player: null,
  }

  initSocket = (socket) => {
    socket.on('connect', () => {
      console.log("Connected: ", socket.id);
      socket.emit(ASK_FOR_TIME);
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

    socket.on(ASK_FOR_TIME, () => {
      socket.emit(SYNC_TIME, this.state.player.getCurrentTime());
    });

    socket.on(SYNC_TIME, (currentTime) => {
      if (this.state.player.getCurrentTime() < currentTime - 0.2 || this.state.player.getCurrentTime() > currentTime + 0.2) {
        this.state.player.seekTo(currentTime);
        this.state.player.playVideo();
      }
    })

  }

  onReady = (e) => {
    this.setState({
      player: e.target
    })

    // Socket
    const socket = io('http://localhost:5000');
    this.setState({socket})
    this.initSocket(socket);
    
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
        this.state.socket.emit(SYNC_TIME, this.state.player.getCurrentTime());
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
