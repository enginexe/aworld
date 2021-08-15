import { Food, ItemType } from "./items.js";

export class Soul {
    name;
    createdTime; // in interval

    /**
     * Youth is the essence of any soul. Soul will lost if youth go negative. The purpose of a soul is to keep youthful.
     * When youth go beyond 6307200...
     */
    youth = 360; // <= 0 ? death, pulse--

    /**
     * 
     */
    resources = {
        cleanse: 0,
        energy: 0,
        particles: 0,
        waste: 0
    };

    /**
     * 
     */
    items = [];

    /**
     * items, other souls, environments
     */
    awareness = [];

    /**
     * 
     */
    connections = [];

    constructor(createdTime, name) {
        this.createdTime = createdTime;
        this.name = name;
    }

    getInfo() {
        return {
            name: this.name,
            resources: this.resources,
            youth: this.youth,
            items: this.items
        };
    }

    processPulse() {
        this.youth--;
    }

    makeFood() {
        const food = new Food();
        this.resources.cleanse -= food.composition.cleanse;
        this.resources.energy -= food.composition.energy;
        this.resources.particles -= food.composition.energy;

        this.items.push(food);
        return food;
    }

    consume(index) {
        if (this.items.length <= index) throw { error: "invalid index passed in." };
        const item = this.items[index];

        const qty = item.composition.cleanse + item.composition.energy + item.composition.particles;
        this.resources.waste += qty;
        this.items.splice(index, 1);

        switch (item.type) {
            case ItemType.Food:
                this.youth += qty * 300;
                console.log("Youth increased by " + qty * 300);
                break;
            default:
                break;
        }

        return true;
    }

    transfer(index, soul) {
        if (this.items.length <= index) throw { error: "invalid index passed in." };
        const item = this.items[index];

        // console.log("Before item count: " + this.name + ": " + this.items.length + " " + soul.name + ": " + soul.items.length);
        this.items.splice(index, 1);
        soul.items.push(item);
        // console.log("After item count: " + this.name + ": " + this.items.length + " " + soul.name + ": " + soul.items.length);
    }
}