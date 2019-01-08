var app = require('http').createServer();

var io = module.exports.io = require('socket.io')(app);

const { PLAY, PAUSE, SYNC_TIME, NEW_VIDEO,
   ASK_FOR_VIDEO_INFORMATION, SYNC_VIDEO_INFORMATION,
   JOIN_ROOM } = require('../Constants');
const PORT = process.env.PORT || 5000



io.on('connection', function(socket) {

  //in = send all
  //to = send all except sender
  var myRoom = '';

  socket.on(JOIN_ROOM, (room) => {
    socket.join(room);
    myRoom = room;
  });
  
  socket.on(PLAY, () => {
    socket.to(myRoom).emit(PLAY);
  });

  socket.on(PAUSE, () => {
    socket.to(myRoom).emit(PAUSE);    
  })

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
  })

});

app.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});