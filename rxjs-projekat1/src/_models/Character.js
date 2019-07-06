export class Character{

    constructor(character)
    {
        if(!character)
        {
            this.id = "";
            this.name = "empty";
            this.class = "";
            this.race = "";
            this.spells ;
        }
        else{
        let spellsList = character.spells.reduce((acc,character)=>{return acc + character.name+", "},"");
        this.id = character.id;
        this.name = character.name;
        this.class = character.class;
        this.race = character.race;
        this.spells = spellsList;
        }
    }
   }