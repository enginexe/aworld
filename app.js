import { Environment, EnvironmentType, Vacuum } from "./environment.js";
import { Soul } from "./soul.js";

class World {
    resources = {
        cleanse: 1000000000000,
        energy: 1000000000000,
        particles: 1000000000000,
        waste: 0
    };

    items = [];
    pulse = 0;
    souls = [];

    environments = [
        new Environment(EnvironmentType.Wild),
        new Environment(EnvironmentType.Shelter)
    ];
    history = [];

    constructor() {
    }

    async startAsync() {
        // resume or start?
        let dataPath;
        if (!!dataPath) {
            console.log("Restoring resource registrations...");
            console.log("Restoring soul registrations...");
            console.log("Restoring history... ");

        } else {
            console.log("Bigbang!!");
        }

        setInterval(() => {
            // console.log("Interval puluse: " + this._pulse + "...");
            this.processPulse();
            this.pulse++;
        }, 200);
    }

    processPulse() {
        /**
         * soul's perception changes as time passes that result in action and reactions,
         * shaping the world, which becomes history...
         */
        for (let i = 0; i < this.souls.length; i++) {
            const soul = this.souls[i];
            if (soul.youth <= 0) {
                this.resources.cleanse += soul.resources.cleanse

                this.souls.splice(i, 1);
                i--;

                console.log("Soul " + soul.getInfo().name + " is dead, R.I.P...");
            }

            soul.processPulse();
        }

        /**
         * Pulse processing - souls' actions influence resources and souls, 
         */
        // read data from multiple nodes and get the truth, record. validate with other nodes.
        /**
         * [ n1 ].data == [ n2 ].data == [ n3 ].data ? prepare() : fault()
         * [ c ].data == [ n4 ].data == [ n5 ].data == [ n6 ].data ? record() : fault()
         */

        // Simulation
        let adam;
        let eve;
        let food;

        switch (this.pulse) {
            case 0:
                console.log("Genesis... the world begins._-+*.*+-_*");
                break;
            case 1:
                this.souls.push(new Soul(this.pulse, "adam"));
                break;
            case 2:
                this.souls.push(new Soul(this.pulse, "eve"));
                break;
            case 3:
                adam = this.getSoul("adam");
                this.mine(adam);
                break;
            case 4:
                adam = this.getSoul("adam");
                eve = this.getSoul("eve");
                this.mine(adam);
                this.mine(eve);
                break;
            case 8:
                adam = this.getSoul("adam");
                eve = this.getSoul("eve");
                this.mine(adam);
                this.mine(eve);
                break;
            case 11:
                adam = this.getSoul("adam");
                eve = this.getSoul("eve");

                adam.makeFood();
                eve.makeFood();
                break;
            case 14:
                adam = this.getSoul("adam");
                eve = this.getSoul("eve");

                adam.makeFood();
                eve.makeFood();
                break;
            case 21:
                adam = this.getSoul("adam");
                eve = this.getSoul("eve");
                adam.consume(0);
                adam.makeFood();
                adam.makeFood();
                adam.makeFood();
                adam.makeFood();
                eve.makeFood();
                eve.makeFood();
                eve.makeFood();
                eve.makeFood();
                eve.makeFood();
                break;
            case 22:
                adam = this.getSoul("adam");
                eve = this.getSoul("eve");
                eve.transfer(0, adam);
                break;
            case 31:
                adam = this.getSoul("adam");
                eve = this.getSoul("eve");
                adam.transfer(0, eve);
                eve.consume(0);
                break;
            case 41:
                break;
            default:
                break;
        }

        /**
        * Recording history... sync acorss decentralized nodes...
        */
        if (this.pulse % 10 === 0) {
            console.log("Recording history... Pulse#" + this.pulse + "...");
            console.log("------ World resources ---------------------");
            console.log(this.resources);
            console.log("------ World souls: " + this.souls.length + " --------------");
            this.souls.forEach(s => {
                console.log(s.getInfo());
            });
        }
    }

    getSoul(name) {
        return this.souls.find(s => s.name === name);
    }

    mine(soul) {
        const cleanse = Math.floor(Math.random() * 100);
        const energy = Math.floor(Math.random() * 100);
        const particles = Math.floor(Math.random() * 100);

        this.resources.cleanse -= cleanse;
        soul.resources.cleanse += cleanse;
        this.resources.energy -= energy;
        soul.resources.energy += energy;
        this.resources.particles -= particles;
        soul.resources.particles += particles;
    }
}

new World().startAsync();