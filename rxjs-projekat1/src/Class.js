export class Class{
    constructor(clas)
    {
            let proficienciesList = clas.proficiencies.reduce((acc,proficiencies)=>{return acc +proficiencies.name+", "},"");
            let saving_throwsList = clas.saving_throws.reduce((acc,saving_throws)=>{return acc +saving_throws.name+", "},"");
            let subclassesList = clas.subclasses.reduce((acc,subclasses)=>{return acc +subclasses.name+", "},"");

            this.id = clas.id;
            this.name = clas.name;
            this.description = clas.description;
            this.hit_die = clas.hit_die;
            this.proficiency_choices = clas.proficiency_choices;
            this.proficiencies = proficienciesList;
            this.saving_throws = saving_throwsList;
            this.starting_equipment = clas.starting_equipment.class;
            this.class_level = clas.class_levels.class;
            this.subclasses = subclassesList;
            this.spellcasting = clas.spellcasting;
            this.url = clas.url;
    }
}