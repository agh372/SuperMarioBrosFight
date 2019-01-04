
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SpriteSheet from './SpriteSheet.js';
import {loadLevel} from './loaders.js';

import Compositor from './Compositor.js';
import {createMario} from './entities';

import { loadBackgroundSprites} from './sprites.js';
import {createSpriteLayer, createBackgroundLayer} from './layers.js'

import {Vec2} from './math.js'
import Entity from './Entity.js';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

componentDidMount(){

    const context = this.myRef.current.getContext('2d');
    const gravity = 20;
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
        comp.layers.push(createSpriteLayer(mario));
    let deltaTime = 0;
    let lastTime = 0;
        function update(time) {
            deltaTime = (time - lastTime)/1000;
            comp.draw(context);
            mario.update(deltaTime);
            mario.vel.y += gravity;
            requestAnimationFrame(update);
            lastTime = time;
        }
    
        update(0);
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
