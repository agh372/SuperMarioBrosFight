import {Trait} from '../Entity.js';

export default class Velocity extends Trait {
    constructor() {
        super('velocity');
        this.currentTime = 0;

        this.killTime = 4;

    }

    update(entity, deltaTime, level) {
        entity.pos.x += entity.vel.x * deltaTime;

        this.currentTime += deltaTime;
        //entity.pos.y += entity.vel.y * deltaTime;
        if( this.currentTime >=  this.killTime)
              level.entities.delete(entity);

    }
}
