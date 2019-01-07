var app = require('http').createServer();

var io = module.exports.io = require('socket.io')(app);

const { PLAY, PAUSE, SYNC_TIME, NEW_VIDEO,
   ASK_FOR_VIDEO_INFORMATION, SYNC_VIDEO_INFORMATION } = require('../Constants');
const PORT = process.env.PORT || 5000

io.on('connection', function(socket) {
  
  socket.on(PLAY, () => {
    socket.broadcast.emit(PLAY);
  });

  socket.on(PAUSE, () => {
    socket.broadcast.emit(PAUSE);    
  })

  socket.on(SYNC_TIME, (currentTime) => {
    socket.broadcast.emit(SYNC_TIME, currentTime);
  });

  socket.on(NEW_VIDEO, (videoURL) => {
    io.emit(NEW_VIDEO, videoURL);
  });

  socket.on(ASK_FOR_VIDEO_INFORMATION, () => {
    socket.broadcast.emit(ASK_FOR_VIDEO_INFORMATION);
  });

  socket.on(SYNC_VIDEO_INFORMATION, (data) => {
    io.emit(SYNC_VIDEO_INFORMATION, data);
  })

});

app.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});