export const EnvironmentType = Object.freeze({
    Wild: Symbol("wild"),
    Shelter: Symbol("shelter")
});

export class Environment {
    souls = [];

    constructor(type, connections) {
        this.type = type;
        this.connections = connections;
    }
}

export class Vacuum extends Environment {
}