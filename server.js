const express = require('express')
const app = express()
const port = 3000;
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use('/',express.static('./public'));

let p1 = null;
let p2 = null;

io.on('connection', socket => {
  // automatically assign player 1 and player 2
  if (!p1) {
    p1 = socket.id;
  }
  else if (!p2) {
    p2 = socket.id;
  }
  socket.on('disconnect', () => {
    // on disconnect empty out players
    p1 = null;
    p2 = null;
  });
});

  io.on('connection', socket => {
    // listen for names
    socket.on('player 1', (data) => {
      io.emit('player 1',data);
    });

    socket.on('player 2', data => {
      io.emit('player 2', data);
    })

    // listen for directions
    socket.on('p1Snake', (data) => {
      io.emit('p1Snake',data);
    });
    socket.on('p2Snake', (data) => {
      io.emit('p2Snake',data);
    });

    // listen for positions
    socket.on('p1SnakeP', (data) => {
      io.emit('p1Snake',data);
    });
    socket.on('p2Snake', (data) => {
      io.emit('p2Snake',data);
    });

    // listen for food location
    socket.on('foodAndScore', (data) => {
      io.emit('foodAndScore',data);
    });


  });

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})