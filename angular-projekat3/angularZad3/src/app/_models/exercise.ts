import { eExercises } from "./eExercise";

export class Exercise {
    name: string;
    effectiveness: number;
    startsOn: Date;
    endsOn: Date;
    type: eExercises;
    ifInjury: boolean;
    injury: string;
    description: string;

    constructor(name: string, effectiveness: number, startsOn: Date, endsOn: Date, type: eExercises, ifInjury: boolean, injury: string, description: string) {
        this.name = name,
            this.effectiveness = effectiveness,
            this.startsOn = startsOn,
            this.endsOn = endsOn,
            this.type = type,
            this.ifInjury = ifInjury,
            this.injury = injury,
            this.description = description
    }
}