var app = require('http').createServer();

var io = module.exports.io = require('socket.io')(app);

const { PLAY, PAUSE, ASK_FOR_TIME, SYNC_TIME } = require('../Constants');
const PORT = process.env.PORT || 5000

io.on('connection', function(socket) {
  
  socket.on(PLAY, () => {
    socket.broadcast.emit(PLAY);
  });

  socket.on(PAUSE, () => {
    socket.broadcast.emit(PAUSE);    
  })

  socket.on(ASK_FOR_TIME, () => {
    socket.broadcast.emit(ASK_FOR_TIME);
  });

  socket.on(SYNC_TIME, (currentTime) => {
    socket.broadcast.emit(SYNC_TIME, currentTime);
  });

});

app.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});