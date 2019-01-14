
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SpriteSheet from './SpriteSheet.js';
import {loadLevel} from './loaders.js';

import Compositor from './Compositor.js';
import {createMario} from './entities';

import { loadBackgroundSprites} from './sprites.js';
import {createSpriteLayer, createBackgroundLayer} from './layers.js'
import Timer from './Timer.js';

import {Vec2} from './math.js'
import Entity from './Entity.js';

import Keyboard from './KeyboardState.js';
import {createCollisionLayer, createCameraLayer} from './layers.js';
import {setupKeyboard} from './input.js';
import levels from './levels/1-1.json';
import Camera from './Camera.js';


export default class Game extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }


  componentWillMount(){


  
  }


  

componentDidMount(){

  console.log("cool: "+this.props.id);
    const context = this.myRef.current.getContext('2d');
    const canvas = this.myRef.current;

    const gravity = 1500;
    Promise.all([
      loadLevel("1-1"),
        createMario()
     //   loadBackgroundSprites(),
        
    ])
    .then(([ level, mario]) => {
       // console.log('Level loader', mario.pos);
    
     //   const comp = new Compositor();
       // comp.layers.push(createBackgroundLayer(level.backgrounds, backgroundSprites));
       const camera = new Camera();
    window.camera = camera;
    mario.pos.set(94, -30);

    // level.comp.layers.push(
    //     createCollisionLayer(level),
    //     createCameraLayer(camera));


    level.entities.add(mario);

    const input = setupKeyboard(mario);
    input.listenTo(window);

  //  setupMouseControl(canvas, mario, camera);


    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        if (mario.pos.x > 100) {
          camera.pos.x = mario.pos.x - 100;
      }

        level.comp.draw(context, camera);
    }

    timer.start();
    });
}

  render() {
    return (
        <div>
          <canvas ref={this.myRef} id="screen" width="640" height="480"></canvas>
          <div>Waiting for player 2...Please enter Game id: <strong>{this.props.id}</strong> to join this game</div>
        </div>
    );
  }
}
