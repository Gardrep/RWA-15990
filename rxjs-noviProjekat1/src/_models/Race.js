export class Race {
    constructor(race) {
        if (!race) {
            this.id = "empty";
            this.name = "empty"
            this.speed = "empty"
            this.ability_bonuses = "empty"
            this.size = "empty"
            this.starting_proficiencies = "empty";
            this.languages = "empty";
            this.traits = "empty";
            this.subraces = "empty";
            this.url = "empty";
        }
        else {
            let languagesList = race.languages.reduce((acc, languages) => { return acc + languages.name + ", " }, "").slice(0, -2);
            let traitsList = race.traits.reduce((acc, traits) => { return acc + traits.name + ", " }, "").slice(0, -2);
            let subracesList = race.subraces.reduce((acc, subraces) => { return acc + subraces.name + ", " }, "").slice(0, -2);
            let starting_proficienciesList = race.starting_proficiencies.reduce((acc, starting_proficiencies) => { return acc + starting_proficiencies.name + ", " }, "").slice(0, -2);
            let ability_bonusesList = race.ability_bonuses.reduce((acc, ability_bonuses) => { return acc + ability_bonuses.name + ":" + ability_bonuses.bonus + ", " }, "").slice(0, -2);

            this.id = race.id;
            this.name = race.name;
            this.speed = race.speed;
            this.ability_bonuses = ability_bonusesList;
            this.size = race.size;
            this.starting_proficiencies = starting_proficienciesList;
            this.languages = languagesList;
            this.traits = traitsList;
            this.subraces = subracesList;
            this.url = race.url;
        }
    }
}