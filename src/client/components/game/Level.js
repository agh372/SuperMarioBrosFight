import Compositor from './Compositor.js';
import TileCollider from './TileCollider.js';
import EntityCollider from './EntityCollider.js';

import {Matrix} from './math.js';

export default class Level {
    constructor() {
        this.gravity = 1500;
        this.totalTime = 0;

        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();

        this.tileCollider = new TileCollider(this.tiles);
        this.entityCollider = new EntityCollider(this.entities);

        this.tempGravity = 0.1;
    }

    addEntity(entity){
        this.entities.add(entity);
    }

    update(deltaTime, level) {
        this.entities.forEach(entity => {
           

            entity.update(deltaTime, level);
            
            if(!entity.gravityDisabled ){
         
                entity.pos.y += entity.vel.y * deltaTime;
                if(!entity.dead){
                this.tileCollider.checkY(entity);
            }
                entity.vel.y += this.gravity * deltaTime *this.tempGravity;


                }else{
                    this.entityCollider.check(entity, level);

                }

                entity.pos.x += entity.vel.x * deltaTime;
                this.tileCollider.checkX(entity, level);
           

            });
        
        this.totalTime += deltaTime;
        if(this.totalTime > 3){
            this.tempGravity = 1;
        }

    }
}
