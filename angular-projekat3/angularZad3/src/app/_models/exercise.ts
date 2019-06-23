import { eExercise } from "./eExercise";

export class Exercise {
    name: string;
    effectiveness: number;
    startsOn: Date;
    endsOn: Date;
    type: eExercise;
    ifInjury: boolean;
    injury: string;
    description: string;
}