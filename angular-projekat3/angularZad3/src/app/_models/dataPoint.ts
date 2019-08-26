import { Consumable, Exercise, Activity } from "./";
import { IDataPoint } from '../_models/IDatapoint';
import { eExercises } from '../_models/eExercise';
import { eActivities } from '../_models/eActivities';
import { eConsumables } from '../_models/eConsumables';


export class DataPoint implements IDataPoint {
    ID?: number;
    name?: string;
    date: Date;
    happy?: number;
    diary?: string;

    consumables?: Consumable[];
    exercises?: Exercise[];
    activities?: Activity[];

    // constructor(data?:DataPoint);
    constructor(ID: number, name: string, date: Date, happy: number, diary: string) {
        this.ID = !ID ? 0 : ID;
        this.name = !name ? "unnamed" : name;
        this.date = !date ? null : date;
        this.happy = !happy ? 0 : happy;
        this.diary = !diary ? "empty" : diary;

        this.consumables = [{
            name: "Cufte",
            timeConsumed: new Date("2019-06-23T15:40:57.034Z"),
            type: eConsumables.MomsFood
        }];
        this.exercises = [{
            name: "Gym1",
            effectiveness: 85,
            startsOn: new Date(),
            endsOn: new Date(),
            type: eExercises.Gym,
            ifInjury: false,
            injury: "",
            description: ""
        }];
        this.activities = [{
            name: "aktivnost",
            effectiveness: 100,
            startsOn: new Date("2019-06-23T01:20:57.034Z"),
            endsOn: new Date("2019-06-23T03:20:57.034Z"),
            type: eActivities.Gaming
        }];
    }
}