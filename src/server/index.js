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

io.on('connection', (socket) => {

    // Create a new game room and notify the creator of game.
    socket.on('createGame', (data) => {
        console.log(data.name)
        socket.join(`room-${++rooms}`);
        socket.emit('newGame', { name: data.name, room: `room-${rooms}` });
    });
});

server.listen(8080, () => console.log('Listening on port 8080!'));