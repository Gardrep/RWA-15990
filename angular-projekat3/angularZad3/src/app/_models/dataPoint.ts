import { Consumable, Exercise, Activities } from "./";
import { IDataPoint } from '../_models/IDatapoint';
import { eExercise } from '../_models/eExercise';

export class DataPoint implements IDataPoint {
    ID?: number;
    name?: string;
    date: Date;
    happy?: number;
    dairy?: string;

    consumables?: Consumable[];
    exercises?: Exercise[];
    activities?: Activities[];

    // constructor(data?:DataPoint);
    constructor(ID: number, name: string, date: Date, happy: number, dairy: string) {
        this.ID = !ID ? 0 : ID;
        this.name = !name ? "unnamed" : name;
        this.date = !date ? null : date;
        this.happy = !happy ? 0 : happy;
        this.dairy = !dairy ? "empty" : dairy;

        this.consumables = [];
        this.exercises = [{
            name: "Gym1",
            effectiveness: 85,
            startsOn: new Date(),
            endsOn: new Date(),
            type: eExercise.Gym,
            ifInjury: false,
            injury: "",
            description: ""
        }];
        this.activities = [];
    }
}