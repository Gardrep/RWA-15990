export class Race{
    constructor(race)
    {
            let languagesList = race.languages.reduce((acc,languages)=>{return acc +languages.name+", "},"");
            let traitsList = race.traits.reduce((acc,traits)=>{return acc +traits.name+", "},"");
            let subracesList = race.subraces.reduce((acc,subraces)=>{return acc +subraces.name+", "},"");
            let starting_proficienciesList = race.starting_proficiencies.reduce((acc,starting_proficiencies)=>{return acc +starting_proficiencies.name+", "},"");
            let ability_bonusesList = race.ability_bonuses.reduce((acc,ability_bonuses)=>{return acc +ability_bonuses.name+":"+ability_bonuses.bonus+", "},"");

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