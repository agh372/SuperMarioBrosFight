import {Vec2} from './math.js';

import Entity from './Entity.js';
import Jump from './traits/Jump.js';
import Go from './traits/Go.js';
import Shoot from './traits/Shoot.js';

import {loadMarioSprite} from './sprites.js';
import {loadSpriteSheet} from './loaders.js';
import {loadImage} from './loaders.js';

import {createAnim} from './anim.js';
import {delay} from './debug.js';
import Velocity from './traits/Velocity.js';

export function createMario() {
    return loadSpriteSheet('mario')
    .then(sprite => {
        const mario = new Entity();
        mario.size.set(14, 16);
        

        mario.addTrait(new Go());
        setTimeout(() => {

        mario.addTrait(new Jump());
    }, 2000);

        mario.addTrait(new Shoot());

       

        mario.name = "mario";

        const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 10);
        function routeFrame(mario) {
            if(mario.hit){
                return 'hurt';
            }
            if (mario.go.dir !== 0) {
                console.log(runAnim(mario.go.distance));
                return runAnim(mario.go.distance);
            }

            return 'idle';
        }
   


        mario.draw = function drawMario(context) {
            //console.log("Draw Mario: "+mario.state);
            sprite.draw(routeFrame(this), context, 0, 0, mario.state > 0);
            //sprite.setColor("255;0;0");
        }
        return mario;
    });
}



export function createLuigi() {
    return loadSpriteSheet('luigi')
    .then(sprite => {
        const luigi = new Entity();
        luigi.size.set(14, 16);

        const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 10);

   // setTimeout(() => {

        luigi.addTrait(new Go());
        setTimeout(() => {

        luigi.addTrait(new Jump());
    }, 2000);

        luigi.addTrait(new Shoot());
        luigi.name = "luigi";


        function routeFrame(luigi) {
            if(luigi.hit){
                return 'hurt';
            }
            if (luigi.go.dir !== 0) {
                return runAnim(luigi.go.distance);
            }

            return 'idle';
        }

  //  }, 4000);


        luigi.draw = function drawLuigi(context) {
            //console.log("Draw Luigi");
            sprite.draw(routeFrame(this), context, 0, 0, luigi.state > 0);
        }

        return luigi;
    });
}
//    "imageURL": "/img/characters.gif",


export function createFire(dir) {
    return loadSpriteSheet('fireball')
    .then(sprite => {
        const fire = new Entity();
        //fire.size.set(14, 16);
        fire.gravityDisabled = true;
        fire.vel  = new Vec2(200 * -dir, 0) ;
        fire.addTrait(new Velocity());
        fire.name = "fire";

        const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 10);
        function routeFrame(fire) {
      

            return 'idle';
        }


    fire.draw = function drawFire(context) {
           // console.log("Draw Mario");
            sprite.draw(routeFrame(this), context, 0, 0, 0);
        }


        return fire;
    });
}