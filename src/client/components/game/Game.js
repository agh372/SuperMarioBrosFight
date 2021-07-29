
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SpriteSheet from './SpriteSheet.js';
import {loadLevel} from './loaders.js';

import Compositor from './Compositor.js';
import {createMario, createLuigi, createFire} from './entities';

import { loadBackgroundSprites} from './sprites.js';
import {createSpriteLayer, createBackgroundLayer} from './layers.js'
import Timer from './Timer.js';

import {Vec2} from './math.js'
import Entity from './Entity.js';

import Keyboard from './KeyboardState.js';
import {createCollisionLayer, createCameraLayer} from './layers.js';
import {setupKeyboard, setupVirtualKeyboard} from './input.js';
import levels from './levels/1-1.json';
import Camera from './Camera.js';
import HealthBar from './health-bar.js';

import marioImage from '../img/mario.png';
import luigiImage from '../img/luigi.png';

import winImage from '../img/win.png';
import loseImage from '../img/lose.jpg';
import Jump from './traits/Jump.js';
import Go from './traits/Go.js';
import Shoot from './traits/Shoot.js';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.onClickRestartGameButton = this.onClickRestartGameButton.bind(this);
    this.delayMyPromise = this.delayMyPromise.bind(this);

    this.state = {
      twoPlayersConnected:false,
      gameOver:false
 };
 this.marioGlobal;
 this.luigiGlobal;


  }


  componentWillMount(){


  
  }


  onClickRestartGameButton(props){


    this.marioGlobal.dead = false;

    this.luigiGlobal.dead = false;

    this.marioGlobal.pos.set(64, 0);

    this.luigiGlobal.pos.set(120, 0);

 
      this.marioGlobal.vel = new Vec2(0,0);
      this.luigiGlobal.vel = new Vec2(0,0);


//if(this.marioGlobal.healthBar != null && this.luigiGlobal.healthBar != null){
  this.marioGlobal.healthBar.color = 'green';

      this.luigiGlobal.healthBar.color = 'green';


      this.marioGlobal.health = 100;

      this.luigiGlobal.health = 100;
 
//}

  }


  

componentDidMount(){
  var a = this;

  if(this.props.secondPlayerConnected){
    console.log(this.props.socket);
    this.props.socket.emit('secondPlayerConnected', { name, room: this.props.id });
  }



  this.props.socket.on('secondPlayerConnectedAck', (data) => {
    console.log("PLEASE");

    this.state.id = data.room;
    this.props.secondPlayerConnected = true; 
    this.setState({twoPlayersConnected:true}); 

});



    const context = this.myRef.current.getContext('2d');
    const canvas = this.myRef.current;

    const gravity = 1500;

    context.scale(2, 2) ;

    Promise.all([

      loadLevel('1-1'),
      createMario(),
      createLuigi(),
  ])
  .then(([level, mario, luigi]) => {


   

      const camera = new Camera();
      window.camera = camera;


  
      mario.pos.set(64, 0);

      luigi.pos.set(120, 0);

      level.entities.add(mario);
      level.entities.add(luigi);

      this.marioGlobal = mario;
      this.luigiGlobal = luigi;




      if(!this.props.secondPlayerConnected){
          mario.player = 0;
          luigi.player = 1;
      }

      if(this.props.secondPlayerConnected){
        mario.player = 1;
        luigi.player = 0;
    }

  

    createCollisionLayer(level);
    createCameraLayer(camera);


  
    if( mario.player == 0){
      const input = setupKeyboard(mario,level, context, camera);
      input.listenTo(window, a.props.socket);
    }

    if( mario.player == 1){
      const inputOther = setupVirtualKeyboard(mario,level, context, camera);
      inputOther.listenToOtherPlayer(a.props.socket);
    }


    if( luigi.player == 0){
      const input = setupKeyboard(luigi,level, context, camera);
      input.listenTo(window, a.props.socket);
    }

    if( luigi.player == 1){
      const inputOther = setupVirtualKeyboard(luigi,level, context, camera);
      inputOther.listenToOtherPlayer(a.props.socket);
    }


    var marioHealthBar = new HealthBar(32,12,70,10,100,'green');
    var luigiHealthBar = new HealthBar(190,12,70,10,100,'green');

mario.healthBar = marioHealthBar;
luigi.healthBar = luigiHealthBar;


      const timer = new Timer(1/60);
      timer.update = function update(deltaTime) {
          level.update(deltaTime, level);

          if (mario.pos.x > 100 && mario.player == 0) {
              camera.pos.x = mario.pos.x - 100;
          }
         // fire.pos.x = mario.pos.x;
        // console.log("Mrio: "+mario.pos.x)
          if (luigi.pos.x > 100 && luigi.player == 0) {
            camera.pos.x = luigi.pos.x - 100;
        }
  
          level.comp.draw(context, camera);


     


          marioHealthBar.updateHealth(mario.health);
          luigiHealthBar.updateHealth(luigi.health);

          if(mario.health <= 30){
            marioHealthBar.color = 'red';
          }

          if(luigi.health <= 30){
            luigiHealthBar.color = 'red';

          }


console.log(mario.pos.y+ "   "+luigi.pos.y);
          marioHealthBar.show(context);
          luigiHealthBar.show(context);

       //   const imageBitmapPromise = createImageBitmap(image[, options]);

    var drawing = new Image();
     drawing.src = marioImage; 
     context.drawImage(drawing, 2, 2, 25, 25);


      var drawingLuigi = new Image();
      drawingLuigi.src = luigiImage; 
      context.drawImage(drawingLuigi, 160, 2, 25, 25);

          if(mario.health <= 0){

            console.log("Health zero");
            
            mario.jump.start();
            //level.entities.delete(mario);
            mario.dead = true;

            if(mario.player == 0){
              var drawing = new Image();
              drawing.src = loseImage; 
              context.drawImage(drawing, 10, 10, 250, 220);
            }else{
              var drawing = new Image();
              drawing.src = winImage; 
              context.drawImage(drawing, 10, 10, 250, 220);
            }

          }

          if(luigi.health <= 0){

            console.log("Health zero");

            luigi.jump.start();
           // level.entities.delete(luigi);
           luigi.dead = true;
            

           if(luigi.player == 0){
            var drawing = new Image();
            drawing.src = loseImage; 
            context.drawImage(drawing, 10, 10, 250, 220);
          }else{
            var drawing = new Image();
            drawing.src = winImage; 
            context.drawImage(drawing, 10, 10, 250, 220);
          }

          }

      }
  
        timer.start();


  });
}

 delayMyPromise(myPromise, myDelay) {
  return new Promise(function (resolve, reject) {
    setTimeout(function() {
      return resolve(myPromise);
    }, myDelay);
  });
}

  render() {
    return (
        <div>
          <canvas ref={this.myRef} id="screen" width="540" height="490"></canvas>
          <button id="new" onClick={this.onClickRestartGameButton}>Restart?</button>
          {!this.props.secondPlayerConnected && !this.state.twoPlayersConnected ? (
          <div>Waiting for player 2...Please enter Game id: <strong>{this.props.id}</strong> to join this game</div>
        ) : (
<div></div>      
)}
        </div>
    );
  }
}
