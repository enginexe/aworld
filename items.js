export const ItemType = Object.freeze({
    Food: Symbol("food"),
    Other: Symbol("other"),
});

class Item {
    constructor(type, cleanse, energy, particles) {
        this.type = type;
        this.composition = {
            cleanse: cleanse,
            energy: energy,
            particles: particles,
        }
    }

    getInfo() {
        return {
            type: this.type,
            composition: this.composition
        };
    }
}

export class Food extends Item {
    constructor() {
        super(ItemType.Food, 1, 1, 1);
    }
}