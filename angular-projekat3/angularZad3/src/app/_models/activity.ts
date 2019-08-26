import { eActivities } from "./eActivities";

export class Activity {
    name: string;
    effectiveness: number;
    startsOn: Date;
    endsOn: Date;
    type: eActivities;
}