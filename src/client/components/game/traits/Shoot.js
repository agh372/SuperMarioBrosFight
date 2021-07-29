import {Sides, Trait} from '../Entity.js';

export function loadBulletBill() {
    return loadSpriteSheet('bullet-bill')
    .then(createBulletBillFactory);
}

export default class Shoot extends Trait {
    constructor() {
        super('bullet');

        this.position = 0;
        this.velocity = 200;
        this.impact = 10;
    }


    update(entity, deltaTime, level) {
        
    }


}


function createBulletBillFactory(sprite) {
    function drawBulletBill(context) {
        sprite.draw('bullet', context, 0, 0);
    }

    return function createBulletBill() {
        const bullet = new Entity();
        bullet.size.set(16, 14);

        bullet.addTrait(new Velocity());
        bullet.addTrait(new Killable());
        bullet.addTrait(new Behavior());

        bullet.draw = drawBulletBill;

        return bullet;
    };
}
