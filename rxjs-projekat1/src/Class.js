export class Class{
    constructor(clas)
    {
            let proficienciesList = clas.proficiencies.reduce((acc,proficiencies)=>{return acc +proficiencies.name+", "},"");
            let saving_throwsList = clas.saving_throws.reduce((acc,saving_throws)=>{return acc +saving_throws.name+", "},"");
            let subclassesList = clas.subclasses.reduce((acc,subclasses)=>{return acc +subclasses.name+", "},"");
            let proficiency_choicesList = clas.proficiency_choices.reduce(
                (acc,proficiencies)=>{
                    return acc +"\n choose:"+proficiencies.choose+" from: "+proficiencies.from.reduce((acc, choice)=>{return acc +choice.name+", "},"")
                },"");

            this.id = clas.id;
            this.name = clas.name;
            this.description = clas.description;
            this.hit_die = clas.hit_die;
            this.proficiency_choices = proficiency_choicesList;
            this.proficiencies = proficienciesList;
            this.saving_throws = saving_throwsList;
            this.starting_equipment = clas.starting_equipment.class;
            this.class_level = clas.class_levels.class;
            this.subclasses = subclassesList;
            this.spellcasting = clas.spellcasting.class;
            this.url = clas.url;
    }
}