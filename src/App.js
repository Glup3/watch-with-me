import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { PLAY, PAUSE, ASK_FOR_TIME, SYNC_TIME, NEW_VIDEO, ASK_FOR_VIDEO_INFORMATION, SYNC_VIDEO_INFORMATION } from './Constants'

var io = require('socket.io-client')

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

class App extends Component {

  state = {
    socket: null,
    player: null,
    videoUrl: 'https://www.youtube.com/watch?v=RsGDjyWHBA0'
  }

  initSocket = (socket) => {
    socket.on('connect', () => {
      console.log("Connected ID: ", socket.id);
      socket.emit(ASK_FOR_VIDEO_INFORMATION);
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
      this.syncTime(currentTime);
    })

    socket.on(NEW_VIDEO, (videoUrl) => {
      this.state.player.loadVideoById({
        videoId: this.getYoutubeIdByUrl(videoUrl)
      })
      this.setState({
        videoUrl: ''
      })
    })

    socket.on(ASK_FOR_VIDEO_INFORMATION, () => {
      const data = {
        url: this.state.player.getVideoUrl(),
        currentTime: this.state.player.getCurrentTime()
      }
      socket.emit(SYNC_VIDEO_INFORMATION, data);
    });

    socket.on(SYNC_VIDEO_INFORMATION, (data) => {
      const videoId = this.getYoutubeIdByUrl(data.url)
      this.state.player.loadVideoById({
        videoId: videoId,
        startSeconds: data.currentTime
      })
    })

  }

  syncTime = (currentTime) => {
    if (this.state.player.getCurrentTime() < currentTime - 0.2 || this.state.player.getCurrentTime() > currentTime + 0.2) {
      this.state.player.seekTo(currentTime);
      this.state.player.playVideo();
    }
  }

  getYoutubeIdByUrl = (url) => {
    var ID = '';
    
    url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

    if(url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_-]/i);
      ID = ID[0];
    }
    else {
      ID = url;
    }
    return ID;
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
        this.state.socket.emit(PLAY);
        break; // NOT LOADED, DO NOTHING
      case 0:
        console.log('STATUS 0');
        break;
      case 1:
        console.log('STATUS 1');
        this.state.socket.emit(SYNC_TIME, this.state.player.getCurrentTime());
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
      default:
        console.log('NANI?!');
        break;
    }
  }

  
  handleSubmit = (e) => {
    e.preventDefault();
    this.state.socket.emit(NEW_VIDEO, this.state.videoUrl);
  }

  handleChange = (e) => {
    this.setState({
      videoUrl: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
          <YouTube 
            //videoId="rTs4ZpM3xWs"
            videoId="RsGDjyWHBA0"
            opts={opts}
            onReady={this.onReady}
            onStateChange={this.onStateChanged}
            className="yt"
          />

          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="URL eingeben" value={this.state.videoUrl} onChange={this.handleChange} />
            <button type="submit">Load new Video</button>
          </form>

      </div>
    );
  }
}

export default App;
