
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SpriteSheet from './SpriteSheet.js';
import {loadImage, loadLevel} from './loaders.js';
import Tiles from './tiles.png';


export default class Game extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }


 drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    });
}

componentDidMount(){
  console.log(this.myRef);
  //.innerHTML  = "Testing";
  const context = this.myRef.current.getContext('2d');
loadImage(Tiles)
.then(image => {
  console.log("cool");
    const sprites = new SpriteSheet(image);
    sprites.define('ground', 0, 0);
    sprites.define('sky', 3, 23);

    loadLevel('1-1')
    .then(level => {
        level.backgrounds.forEach(bg => {
            {this.drawBackground(bg, context, sprites)};
        });
    });
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
