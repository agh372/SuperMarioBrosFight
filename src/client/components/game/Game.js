
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SpriteSheet from './SpriteSheet.js';
import {loadLevel} from './loaders.js';

import Compositor from './Compositor.js';
import { loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer} from './layers.js'

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

 createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        sprite.draw('idle', context, pos.x, pos.y);
    };
}

componentDidMount(){

    const context = this.myRef.current.getContext('2d');

    Promise.all([
      //  loadMarioSprite(),
        loadBackgroundSprites(),
        loadLevel('1-1')
    ])
    .then(([ backgroundSprites, level]) => {
        console.log('Level loader', level);
    
        const comp = new Compositor();
        comp.layers.push(createBackgroundLayer(level.backgrounds, backgroundSprites));
    
        const pos = {
            x: 64,
            y: 64,
        };
    
      //  comp.layers.push(this.createSpriteLayer(marioSprite, pos));
    
        function update() {
            comp.draw(context);
            pos.x += 2;
            pos.y += 1;
            requestAnimationFrame(update);
        }
    
        update();
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
