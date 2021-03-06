const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const db = require('./init-db.js')();
const bodyParser= require('body-parser');
const router = require('./routes/index.js')

const path = require('path');
app.set('views', path.join(__dirname, '/view'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router(app);

const server = http.listen(8080, () => {
    console.log('listening on *:8080');
});

io.sockets.on('connection', function(socket) {
  socket.on('join-conversation', function(data) {
    socket.join(data.conversationId);
  });

  socket.on('chatted', function(data) {
    io.in(data.conversationId).emit('update-conversation')
  });
});
