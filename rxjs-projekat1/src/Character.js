export class Character{

    constructor(character)
    {
    let spellsList = character.spells.reduce((acc,character)=>{return acc + character.name+", "},"");
    this.id = character.id;
    this.name = character.name;
    this.class = character.class;
    this.race = character.race;
    this.spells = spellsList;
    }
   }