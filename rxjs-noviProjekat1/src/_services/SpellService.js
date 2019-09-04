import { Global } from "../Global.js";
import { mainDiv } from '../index.js';
import { fromEvent, range, from } from 'rxjs';
import { Spell } from "../_models/Spell.js";
import { CharacterService } from "./CharacterService.js";
import { DBService } from "./DBService.js";
import { filter, toArray, map } from 'rxjs/operators';

export const SpellService = {

    AllSpells: DBService.GetAll("spells"),

    ShowSpellsTable(showRadio) {
        Global.GetHTML("Template").then((text) => {
            mainDiv.innerHTML = text;
            /*if (showRadio) {
                var btndiv = document.createElement("div");
                btndiv.className = "col-auto my-1";
                inputdiv.appendChild(btndiv);
    
                var commitbtn = document.createElement("button");
                commitbtn.innerHTML = "Commit";
                commitbtn.className = "btn btn-primary";
                btndiv.appendChild(commitbtn);
    
                fromEvent(commitbtn, 'click').subscribe(function () {
                    Global.character.spells = [];
                    document.querySelectorAll('input[name="exampleRadios"]:checked').forEach((spel) => {
                        Global.character.spells.push(spel.value);
                    });
                    mainDiv.innerHTML = "";
                    CharacterService.AddCharacter();
                });
            }
            */

            var inputdiv = document.getElementById("Input");
            console.log(inputdiv);
            //----------------------------------------------------------NAME
            var search = document.getElementById("InputName");

            const input = fromEvent(search, 'input');
            input.subscribe(() => {
                this.Filter(showRadio);
            });

            //----------------------------------------------------------LEVEL
            var leveldiv = document.createElement("div");
            leveldiv.className = "my-1 mx-2";
            inputdiv.appendChild(leveldiv);

            var levelbtndiv = document.createElement("div");
            levelbtndiv.className = "btn-group";
            leveldiv.appendChild(levelbtndiv);

            var levelbtn = document.createElement("button");
            levelbtn.innerHTML = "Level";
            levelbtn.className = "btn btn-secondary btn-sm dropdown-toggle";
            levelbtn.id = "levelID";
            levelbtn.type = "button";
            levelbtn.setAttribute("data-toggle", "dropdown");
            levelbtn.setAttribute("aria-haspopup", "true");
            levelbtn.setAttribute("aria-expanded", "false");
            levelbtndiv.appendChild(levelbtn);

            var levelmenudiv = document.createElement("div");
            levelmenudiv.className = "dropdown-menu";
            levelbtndiv.appendChild(levelmenudiv);

            let levellink;
            const numbers = range(0, 10);
            let AddLevel = (lvl) => {
                levellink = document.createElement("a");
                levellink.className = "dropdown-item";
                levellink.innerHTML = `${lvl}`;
                levelmenudiv.appendChild(levellink);

                const level$ = fromEvent(levellink, 'click');
                level$.subscribe((chosenlevel) => {
                    levelbtn.innerHTML = chosenlevel.path[0].innerHTML;
                    this.Filter(showRadio);
                });
            };
            AddLevel("Level");
            numbers.subscribe(x => { AddLevel(x); });


            //----------------------------------------------------------RANGE
            var rangediv = document.createElement("div");
            rangediv.className = "my-1 mx-2";
            inputdiv.appendChild(rangediv);

            var rangebtndiv = document.createElement("div");
            rangebtndiv.className = "btn-group";
            rangediv.appendChild(rangebtndiv);

            var rangebtn = document.createElement("button");
            rangebtn.innerHTML = "Range";
            rangebtn.className = "btn btn-secondary btn-sm dropdown-toggle";
            rangebtn.id = "rangeID";
            rangebtn.type = "button";
            rangebtn.setAttribute("data-toggle", "dropdown");
            rangebtn.setAttribute("aria-haspopup", "true");
            rangebtn.setAttribute("aria-expanded", "false");
            rangebtndiv.appendChild(rangebtn);

            var rangemenudiv = document.createElement("div");
            rangemenudiv.className = "dropdown-menu";
            rangebtndiv.appendChild(rangemenudiv);

            let rangelink;
            let RangeList = ["Range", "10 feet", "30 feet", "60 feet", "90 feet", "120 feet", "Touch", "Self"];
            const rangeOptions = from(RangeList);
            rangeOptions.subscribe(x => {
                rangelink = document.createElement("a");
                rangelink.className = "dropdown-item";
                rangelink.innerHTML = `${x}`;
                rangemenudiv.appendChild(rangelink);

                const range$ = fromEvent(rangelink, 'click');
                range$.subscribe((chosenRange) => {
                    rangebtn.innerHTML = chosenRange.path[0].innerHTML;
                    this.Filter(showRadio);
                });
            });

            //----------------------------------------------------------RITUAL
            var ritualldiv = document.createElement("div");
            ritualldiv.className = "my-1 mx-2";
            inputdiv.appendChild(ritualldiv);

            var ritualbtndiv = document.createElement("div");
            ritualbtndiv.className = "btn-group";
            ritualldiv.appendChild(ritualbtndiv);

            var ritualbtn = document.createElement("button");
            ritualbtn.innerHTML = "Ritual";
            ritualbtn.className = "btn btn-secondary btn-sm dropdown-toggle";
            ritualbtn.id = "ritualID";
            ritualbtn.type = "button";
            ritualbtn.setAttribute("data-toggle", "dropdown");
            ritualbtn.setAttribute("aria-haspopup", "true");
            ritualbtn.setAttribute("aria-expanded", "false");
            ritualbtndiv.appendChild(ritualbtn);

            var ritualmenudiv = document.createElement("div");
            ritualmenudiv.className = "dropdown-menu";
            ritualbtndiv.appendChild(ritualmenudiv);

            let rituallink;
            var ritual$;
            let ritualList = ["Ritual", "yes", "no"];
            const ritualOptions = from(ritualList);
            ritualOptions.subscribe(x => {
                rituallink = document.createElement("a");
                rituallink.className = "dropdown-item";
                rituallink.innerHTML = `${x}`;
                ritualmenudiv.appendChild(rituallink);

                ritual$ = fromEvent(rituallink, 'click');
                ritual$.subscribe((chosenritual) => {
                    ritualbtn.innerHTML = chosenritual.path[0].innerHTML;
                    this.Filter(showRadio);
                });
            });

            //----------------------------------------------------------CLASSES
            var classdiv = document.createElement("div");
            classdiv.className = "my-1 mx-2";
            inputdiv.appendChild(classdiv);

            var classbtndiv = document.createElement("div");
            classbtndiv.className = "btn-group";
            classdiv.appendChild(classbtndiv);

            var classbtn = document.createElement("button");
            classbtn.innerHTML = "Class";
            classbtn.className = "btn btn-secondary btn-sm dropdown-toggle";
            classbtn.id = "classID";
            classbtn.type = "button";
            classbtn.setAttribute("data-toggle", "dropdown");
            classbtn.setAttribute("aria-haspopup", "true");
            classbtn.setAttribute("aria-expanded", "false");
            classbtndiv.appendChild(classbtn);

            var classmenudiv = document.createElement("div");
            classmenudiv.className = "dropdown-menu";
            classbtndiv.appendChild(classmenudiv);

            let classinput, classLabel, pomDiv;
            let ClassList = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];
            const classOptions = from(ClassList);
            classOptions.subscribe(x => {
                pomDiv = document.createElement("div");
                pomDiv.classList.add("d-flex", "dropdown-item", "align-items-center")
                classmenudiv.appendChild(pomDiv);


                classinput = document.createElement("input");
                classinput.type = "checkbox";
                classinput.className = "mr-2";
                classinput.id = `${x}`;
                classinput.name = "cbx";
                classinput.value = `${x}`;
                //classinput.innerHTML = `${x}`;
                pomDiv.appendChild(classinput);

                classLabel = document.createElement("span");
                classLabel.innerHTML = `${x}`;
                classLabel.htmlFor = `${x}`;
                pomDiv.appendChild(classLabel);
                classLabel.onclick = () => {

                    document.getElementById(`${x}`).checked = !document.getElementById(`${x}`).checked;
                }

                const class$ = fromEvent(classinput, 'click');
                class$.subscribe(() => {
                    this.Filter(showRadio);
                });
            });

            //------------------------------------------------------------------TABELA

            Global.FillTable("Spells", showRadio);
        });
    },

    Filter(showRadio) {

        this.AllSpells.subscribe((list) => {
            list = list.map(spell => { return new Spell(spell); });
            let source = from(list);

            let filterName = document.getElementById("myInput").value.toUpperCase();
            let filterLevel = document.getElementById("levelID").innerHTML;
            let filterRange = document.getElementById("rangeID").innerHTML;
            let filterRitual = document.getElementById("ritualID").innerHTML;
            let filterClasses = [];
            for (let pom of document.querySelectorAll(`input[name="cbx"]:checked`)) {
                filterClasses.push(pom.value);
            }


            source.pipe(
                filter(spell => {
                    return filterName == "" || spell.name.toUpperCase().includes(filterName)
                }),
                filter(spell => {
                    return isNaN(filterLevel) || spell.level == filterLevel;
                }),
                filter(spell => {
                    return filterRange == "Range" || !spell.range.localeCompare(filterRange);
                }),
                filter(spell => {
                    return filterRitual == "Ritual" || !spell.ritual.localeCompare(filterRitual);
                }),
                filter(spell => {
                    return filterClasses.length == 0 || filterClasses.reduce((acc, x) => {
                        return acc || spell.classes.includes(x);
                    }, false)
                }),
                toArray()
            ).subscribe(val => Global.FillTable("Spells", showRadio, val));
        });
    }
}