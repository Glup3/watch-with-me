var app = require('http').createServer();

var io = module.exports.io = require('socket.io')(app);

const { PLAY, PAUSE } = require('../Constants');
const PORT = process.env.PORT || 5000

io.on('connection', function(socket) {
  console.log("made socket connection: ", socket.id);

  socket.on(PLAY, () => {
    socket.broadcast.emit(PLAY);
  });

  socket.on(PAUSE, () => {
    socket.broadcast.emit(PAUSE);    
  })

});

app.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});