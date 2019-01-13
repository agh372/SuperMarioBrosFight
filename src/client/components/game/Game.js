
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
import {setupMouseControl} from './debug.js';
import Camera from './Camera.js';


export default class Game extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

componentDidMount(){

    const context = this.myRef.current.getContext('2d');
    const canvas = this.myRef.current;

    const gravity = 260;
    Promise.all([
        createMario(),
     //   loadBackgroundSprites(),
        loadLevel("1-1")
    ])
    .then(([ mario, level]) => {
        console.log('Level loader', mario.pos);
    
     //   const comp = new Compositor();
       // comp.layers.push(createBackgroundLayer(level.backgrounds, backgroundSprites));
       const camera = new Camera();
    window.camera = camera;

    mario.pos.set(64, 64);

    // level.comp.layers.push(
    //     createCollisionLayer(level),
    //     createCameraLayer(camera));


    level.entities.add(mario);

    const input = setupKeyboard(mario);
    input.listenTo(window);

    setupMouseControl(canvas, mario, camera);


    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        level.comp.draw(context, camera);
    }

    timer.start();
    });
}

  render() {
    return (
        <div>
          <canvas ref={this.myRef} id="screen" width="640" height="480"></canvas>
        </div>
    );
  }
}
