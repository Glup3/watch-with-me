var app = require('http').createServer()

var io = module.exports.io = require('socket.io')(app);

const PORT = process.env.PORT || 5000

io.on('connection', function(socket) {
  // hier passiert iwas
});

app.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});