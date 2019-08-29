import { Consumable, Exercise, Activity } from "../_models/";

export interface IDataPoint {
    id?: number;
    name?: string;
    date: Date;
    happy?: number;
    dairy?: string;

    consumables?: Consumable[];
    exercises?: Exercise[];
    activities?: Activity[];
}