import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loaders.js';
import Tiles from './img/tiles.png';
//import Characters from './img/characters.gif';


// export function loadMarioSprite() {
//     return loadImage(Characters)
//     .then(image => {
//         const mario = new SpriteSheet(image, 16, 16);
//         mario.define('idle', 276, 44, 16, 16);
//         return mario;
//     });
// }

export function loadBackgroundSprites() {
    return loadImage(Tiles)
    .then(image => {
        console.log('Image loaded', image);
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.defineTile('ground', 0, 0);
        sprites.defineTile('sky', 3, 23);
        return sprites;
    });
}
