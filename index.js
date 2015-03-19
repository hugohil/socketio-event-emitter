console.log('Wait a second ...');
var eventName = process.argv[2] || 'trigger';
var port = process.argv[3] || 1992;

var io = require('socket.io')(port);
var keypress = require('keypress');

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

io.on('connection', function (socket) {
  console.log('Press space to send a ' + eventName + ' event on port ' + port);
  process.stdin.on('keypress', function (ch, key) {
    if(key && key.name == 'space') {
      socket.emit(eventName);
      console.log(eventName + ' sent.');
    }
    if (key && key.ctrl && key.name == 'c') {
      process.exit();
    }
  });
});

process.stdin.setRawMode(true);
process.stdin.resume();