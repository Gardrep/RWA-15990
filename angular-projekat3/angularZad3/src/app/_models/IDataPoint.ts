import { Consumable, Exercise, Activities } from "../_models/";

export interface IDataPoint {
    ID?: number;
    name?: string;
    date: Date;
    happy?: number;
    dairy?: string;

    consumables?: Consumable[];
    exercises?: Exercise[];
    activities?: Activities[];
}