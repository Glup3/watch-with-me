import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { PLAY, PAUSE, SYNC_TIME, NEW_VIDEO, ASK_FOR_VIDEO_INFORMATION, SYNC_VIDEO_INFORMATION, JOIN_ROOM, RECEIVED_MESSAGE } from '../Constants'
import { Button, Input } from 'react-materialize';
import ChatLayout from './chat/ChatLayout';
import Row from 'react-materialize/lib/Row';
import Col from 'react-materialize/lib/Col';

var io = require('socket.io-client');
const socketUrl = process.env.REACT_APP_SOCKET_URL || "/";

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

export class VideoScreen extends Component {

  state = {
    username: '',
    room: '',
    socket: null,
    player: null,
    videoUrl: '',
    messages: [
      {username: 'user1', text:'Hi'},
      {username: 'user2', text:'Servas'},
      {username: 'user1', text:'Wie gehts wie stehts?'},
    ],
    users: [
      {username: 'ich'},
      {username: 'du'},
      {username: 'er'},
      {username: 'max'},
    ]
  }

  componentDidMount() {
    this.setState({
      username: this.props.username,
      room: this.props.room
    });
  }

  onSocketMethods = (socket) => {
    socket.on('connect', () => {
      socket.emit(JOIN_ROOM, {
        room: this.state.room,
        username: this.state.username,
      });
      socket.emit(ASK_FOR_VIDEO_INFORMATION);
    });

    socket.on('disconnect', () => {
      console.log("Disconnected");
    });

    socket.on(PLAY, () => {
      this.state.player.playVideo();
    });

    socket.on(PAUSE, () => {
      this.state.player.pauseVideo();
    });

    socket.on(SYNC_TIME, (currentTime) => {
      this.syncTime(currentTime);
    })

    socket.on(NEW_VIDEO, (videoUrl) => {
      this.state.player.loadVideoById({
        videoId: this.getYoutubeIdByUrl(videoUrl)
      });
      this.setState({
        videoUrl: ''
      });
    });

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
      });
    });

    socket.on(RECEIVED_MESSAGE, (data) => {
      this.setState({
        messages: [...this.state.messages, {
          username: data.username,
          text: data.text
        }]
      });
    });

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
    });

    // Socket
    const socket = io(socketUrl);
    this.setState({socket});
    this.onSocketMethods(socket);
  }

  onStateChanged = (e) => {
    switch (this.state.player.getPlayerState()) {
      case -1:
        this.state.socket.emit(PLAY);
        break;
      case 0:
        break;
      case 1:
        this.state.socket.emit(SYNC_TIME, this.state.player.getCurrentTime());
        this.state.socket.emit(PLAY);
        break;
      case 2:
        this.state.socket.emit(PAUSE);
        break;
      case 3:
        this.state.player.playVideo();
        break;
      case 5:
        break;
      default:
        break;
    }
  }

  
  handleSubmit = (e) => {
    e.preventDefault();
    this.state.socket.emit(NEW_VIDEO, this.state.videoUrl);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col s={12} xl={9}>
            <div className="responsive-video">
              <YouTube 
                //videoId="rTs4ZpM3xWs"
                videoId="RsGDjyWHBA0"
                opts={opts}
                onReady={this.onReady}
                onStateChange={this.onStateChanged}
                className="yt"
              />
            </div>
          </Col>
          <Col s={12} xl={3}>
            <ChatLayout 
              username={this.props.username} 
              room={this.props.room} 
              messages={this.state.messages}
              users={this.state.users}
              socket={this.state.socket} />
          </Col>
        </Row>
        
        <Row>
          <form onSubmit={this.handleSubmit}>
            <Input className="white-text" type="text" placeholder="URL eingeben" id="videoUrl" value={this.state.videoUrl} onChange={this.handleChange} />
            <Button type="submit" className="black">Load new Video</Button>
          </form>
        </Row>
      </div>
    )
  }
}

export default VideoScreen
