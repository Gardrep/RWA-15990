import { eActivities } from "./eActivities";

export class Activity {
    name: string;
    effectiveness: number;
    startsOn: Date;
    endsOn: Date;
    type: eActivities;
    description: string;


    constructor(name: string, effectiveness: number, startsOn: Date, endsOn: Date, type: eActivities, description: string) {
    
            this.name = name,
            this.effectiveness = effectiveness,
            this.startsOn = startsOn,
            this.endsOn = endsOn,
            this.type = type,
            this.description = description
    }
}