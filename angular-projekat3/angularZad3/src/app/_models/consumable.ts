import { eConsumables } from "./eConsumables";

export class Consumable {
    name: string;
    timeConsumed: Date;
    type: eConsumables;

    constructor(name: string, timeConsumed: Date, type: eConsumables) {
        this.name = name,
            this.timeConsumed = timeConsumed,
            this.type = type
    }
}