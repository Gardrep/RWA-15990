import { Consumable, Exercise, Activities } from "./";
import { DatePipe } from '@angular/common';
import { IDataPoint } from '../_models/IDatapoint';

export class DataPoint implements IDataPoint{
    ID?: number;
    name?: string;
    date: Date;
    happy?: number;
    dairy?: string;

    consumables?: Consumable[];
    exercises?: Exercise[];
    activities?: Activities[];

    constructor(ID:number, date: Date, name: string) {
        this.ID = !ID? 0:ID;
        this.name = !name? "unnamed" : name;
        this.date = !date?null:date;
        this.happy = 0;
        this.dairy = "empty";

        this.consumables =[];
        this.exercises =[];
        this.activities =[];
    }

    myname?() {
        let datePipe = new DatePipe("en-US");
        return this.ID+" " + datePipe.transform(this.date, "dd.MM.yyyy") + " " + this.happy;
    }
}