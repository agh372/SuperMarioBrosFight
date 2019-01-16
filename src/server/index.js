// const express = require('express');
// const os = require('os');

// const app = express();

// app.use(express.static('dist'));
// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
// app.listen(8080, () => console.log('Listening on port 8080!'));


const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let rooms = 0;

app.use(express.static('dist'));
app.use('/level/',express.static('src/client/components/game/levels'));
app.use('/sprites/',express.static('src/client/components/game/sprites'));
app.use('/img/',express.static('src/client/components/img'));

var getUsersInRoomNumber = function(roomName, namespace) {
    if (!namespace) namespace = '/';
    var room = io.nsps[namespace].adapter.rooms[roomName];
    if (!room) return null;
    var num = 0;
    for (var i in room) num++;
    return num;
}

io.on('connection', (socket) => {

    // Create a new game room and notify the creator of game.
    socket.on('createGame', (data) => {
        console.log("server: room-"+ (rooms+1));
        socket.join(`room-${++rooms}`);
        socket.emit('newGame', { name: data.name, room: `room-${rooms}` });
    });


    socket.on('secondPlayerConnected', function (data) {
    console.log("server ack p2 "+data.room);
        socket.broadcast.to(data.room).emit('secondPlayerConnectedAck', {});


    });

    socket.on('joinGame', function (data) {

       var room =  io.nsps["/"].adapter.rooms[data.room];
     
         if (room && room.length === 1) {
            console.log(room.length);
            socket.join(data.room);

            socket.broadcast.to(data.room).emit('player1', {});
            socket.emit('player2', { name: data.name, room: data.room })
         } else {
          //  socket.emit('err', { message: 'Sorry, The room is full!' });
          console.log("Room is full "+room.length);
     }
});

});

server.listen(8080, () => console.log('Listening on port 8080!'));