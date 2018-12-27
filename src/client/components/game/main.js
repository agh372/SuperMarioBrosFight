 import SpriteSheet from './SpriteSheet.js';
 import {loadImage, loadLevel} from './loaders.js';
 import Player from './player.js';

// const canvas = document.getElementById('screen');
// const context = canvas.getContext('2d');

// function drawBackground(background, context, sprites) {
//     background.ranges.forEach(([x1, x2, y1, y2]) => {
//         for (let x = x1; x < x2; ++x) {
//             for (let y = y1; y < y2; ++y) {
//                 sprites.drawTile(background.tile, context, x, y);
//             }
//         }
//     });
// }


// loadImage('/img/tiles.png')
// .then(image => {
//     const sprites = new SpriteSheet(image);
//     sprites.define('ground', 0, 0);
//     sprites.define('sky', 3, 23);

//     loadLevel('1-1')
//     .then(level => {
//         level.backgrounds.forEach(bg => {
//             drawBackground(bg, context, sprites);
//         });
//     });
// });

(function(){

    // Types of players
    var P1 = 'Mario', P2 = 'Luigi';
    var socket = io.connect('http://localhost:5000');
    let  player;
     let game;
  
    /**
     * Create a new game. Emit newGame event.
     */
    $('#new').on('click', function(){
      var name = $('#nameNew').val();
      if(!name){
        alert('Please enter your name.');
        return;
      }
      socket.emit('createGame', {name: name});
      player = new Player(name, P1);
    });
  
    /** 
     *  Join an existing game on the entered roomId. Emit the joinGame event.
     */ 
    $('#join').on('click', function(){
      var name = $('#nameJoin').val();
      var roomID = $('#room').val();
      if(!name || !roomID){
        alert('Please enter your name and game ID.');
        return;
      }
      socket.emit('joinGame', {name: name, room: roomID});
      //player = new Player(name, P2);
    });

    socket.on('newGame', (data) => {
        const message =
          `Hello, ${data.name}. Please ask your friend to enter Game ID: 
          ${data.room}. Waiting for player 2...`;
    
        // Create game for player 1
     //   game = new Game(data.room);
    //game.displayBoard(message);
    });

  })();
  
