export class Spell {
  constructor(spell) {
    let classesList = spell.classes.reduce((acc, classes) => { return acc + classes.name + ", " }, "").slice(0, -2);
    let subclassesList = spell.subclasses.reduce((acc, subclasses) => { return acc + subclasses.name + ", " }, "").slice(0, -2);
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

  static atributeList() {
    return  ["ID","Spell Name","Level","Range","Ritual","Duration","Concentration","Casting_time","School","Classes","Description"];
  }

  static rangeList(){
    return ["Range", "10 feet", "30 feet", "60 feet", "90 feet", "120 feet","500 feet", "Touch", "Self"];
  }

  static ritualList(){
    return ["Ritual", "yes", "no"];
  }

  static classList(){
    return ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];
  }
  
}