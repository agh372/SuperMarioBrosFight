import Compositor from './Compositor.js';
import TileCollider from './TileCollider.js';
import {Matrix} from './math.js';

export default class Level {
    constructor() {
        this.gravity = 1500;
        this.totalTime = 0;

        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();

        this.tileCollider = new TileCollider(this.tiles);
        this.tempGravity = 0.1;
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);

            entity.vel.y += this.gravity * deltaTime *this.tempGravity;
        });
        this.totalTime += deltaTime;
        if(this.totalTime > 3){
            this.tempGravity = 1;
        }

    }
}
