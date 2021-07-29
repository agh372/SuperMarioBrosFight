export default class EntityCollider {
    constructor(entities) {
        this.entities = entities;
    }

    check(subject, level) {
       // console.log("SIZE: "+this.entities.size);

        this.entities.forEach(candidate => {
            if (subject === candidate) {
                return;
            }

            if (subject.bounds.overlaps(candidate.bounds)) {

                subject.collides(candidate);
                candidate.collides(subject);
            }

            if(candidate.name == "fire")
            console.log(candidate.pos.x +  "    "+subject.pos.x);
            if((subject.pos.x > candidate.pos.x-4 &&  subject.pos.x < candidate.pos.x+4) && (subject.source!=candidate.name || subject.name == candidate.name)
             && subject.pos.y == candidate.pos.y){
                level.entities.delete(subject);

                if(subject.name == candidate.name){

                    level.entities.delete(candidate);
                    return;

                }else{
                    candidate.health -= 10;

                }
                candidate.hit = true;
                setTimeout(() => {
                    candidate.hit = false;

                  }, 300);
            }
        });
    }
}
