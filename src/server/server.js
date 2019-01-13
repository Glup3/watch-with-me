const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = module.exports.io = require('socket.io')(server);

const { PLAY, PAUSE, SYNC_TIME, NEW_VIDEO,
   ASK_FOR_VIDEO_INFORMATION, SYNC_VIDEO_INFORMATION,
   JOIN_ROOM, SEND_MESSAGE, RECEIVED_MESSAGE } = require('../Constants');
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + '/../../build'));

io.on('connection', function(socket) {

  //in = send all
  //to = send all except sender
  var myRoom = '';
  var myUsername = '';

  socket.on(JOIN_ROOM, (data) => {
    socket.join(data.room);
    myRoom = data.room;
    myUsername = data.username;

    const message = myUsername + " joined the room.";
    io.in(myRoom).emit(RECEIVED_MESSAGE, {
      username: 'Server Notification',
      text: message
    });
  });
  
  socket.on(PLAY, () => {
    socket.to(myRoom).emit(PLAY);
  });

  socket.on(PAUSE, () => {
    socket.to(myRoom).emit(PAUSE);    
  });

  socket.on(SYNC_TIME, (currentTime) => {
    socket.to(myRoom).emit(SYNC_TIME, currentTime);
  });

  socket.on(NEW_VIDEO, (videoURL) => {
    io.to(myRoom).emit(NEW_VIDEO, videoURL);
  });

  socket.on(ASK_FOR_VIDEO_INFORMATION, () => {
    socket.to(myRoom).emit(ASK_FOR_VIDEO_INFORMATION);
  });

  socket.on(SYNC_VIDEO_INFORMATION, (data) => {
    io.to(myRoom).emit(SYNC_VIDEO_INFORMATION, data);
  });

  socket.on(SEND_MESSAGE, (data) => {
    io.in(myRoom).emit(RECEIVED_MESSAGE, data);
  });

  socket.on('disconnect', () => {
    const message = myUsername + " disconnected.";
    socket.in(myRoom).emit(RECEIVED_MESSAGE, {
      username: 'Server Notification',
      text: message
    });
  });

});

server.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});