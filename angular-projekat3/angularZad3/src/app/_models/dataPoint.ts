import { Consumable, Exercise, Activity } from "./";
import { IDataPoint } from '../_models/IDatapoint';
import { eExercises } from '../_models/eExercise';
import { eActivities } from '../_models/eActivities';
import { eConsumables } from '../_models/eConsumables';


export class DataPoint implements IDataPoint {
    id?: number;
    name?: string;
    date: Date;
    happy?: number;
    diary?: string;

    consumables?: Consumable[];
    exercises?: Exercise[];
    activities?: Activity[];

    // constructor(data?:DataPoint);
    constructor(id: number, name: string, date: Date, happy: number, diary: string) {
        this.id = !id ? 0 : id;
        this.name = !name ? "unnamed" : name;
        this.date = new Date(!date ? null : date);
        this.happy = !happy ? 0 : happy;
        this.diary = !diary ? "empty" : diary;

        this.consumables = [{
            name: "empty",
            timeConsumed: new Date(),
            type: eConsumables.Other
        }];
        this.exercises = [{
            name: "empty",
            effectiveness: 0,
            startsOn: new Date(),
            endsOn: new Date(),
            type: eExercises.Other,
            ifInjury: false,
            injury: "",
            description: "empty"
        }];
        this.activities = [{
            name: "empty",
            effectiveness: 0,
            startsOn: new Date(),
            endsOn: new Date(),
            type: eActivities.Other,
            description: "empty"
        }];
    }
}