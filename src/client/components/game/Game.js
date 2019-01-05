
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


export default class Game extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

componentDidMount(){

    const context = this.myRef.current.getContext('2d');
    const gravity = 120;
    Promise.all([
        createMario(),
        loadBackgroundSprites(),
        loadLevel('1-1')
    ])
    .then(([ mario,backgroundSprites, level]) => {
        console.log('Level loader', mario.pos);
    
        const comp = new Compositor();
        comp.layers.push(createBackgroundLayer(level.backgrounds, backgroundSprites));
        mario.pos.set(64, 180);
        mario.vel.set(20, -60);
        const SPACE = 32;
        const input = new Keyboard();
        input.addMapping(SPACE, keyState => {
            if (keyState) {
                mario.jump.start();
            } else {
                mario.jump.cancel();
            }
        });
        input.listenTo(window);
    
    
        const spriteLayer = createSpriteLayer(mario);
        comp.layers.push(spriteLayer);
    
        const timer = new Timer(1/60);
        timer.update = function update(deltaTime) {
            mario.update(deltaTime);
    
            comp.draw(context);
    
            mario.vel.y += gravity * deltaTime;
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
