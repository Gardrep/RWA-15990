export class Spell{

 constructor(spell)
 {
   let classesList = spell.classes.reduce((acc,classes)=>{return acc +classes.name+", "},"");
   let subclassesList = spell.subclasses.reduce((acc,subclasses)=>{return acc +subclasses.name+", "},"");
   this.id = spell.id;
   this.name = spell.name;
   this.desc = spell.desc;
   this.page = spell.page;
   this.range = spell.range;
   this.components = spell.components;
   this.ritual = spell.ritual;
   this.duration = spell.duration;
   this.concentration = spell.concentration;
   this.casting_time = spell.casting_time;
   this.level = spell.level;
   this.school = spell.school.name;
   this.classes = classesList;
   this.subclasses = subclassesList;
   this.url = spell.url;
 }
}