
import { fromEvent, zip, of, forkJoin, from } from 'rxjs';
import {  map, toArray } from 'rxjs/operators';
import { mainDiv } from './index.js'

import { Character } from './_models/Character.js';
import { Class } from "./_models/Class.js";
import { Race } from './_models/Race.js';
import { Spell } from './_models/Spell.js';

import { CharacterService } from './_components/character/CharacterService.js';
import { ClassService } from './_components/class/ClassService.js';
import { RaceService } from './_components/race/RaceService.js';
import { SpellService } from './_components/spell/SpellService.js';

import { DBService } from "./_services/DBService.js";

export const CoreBuilder = {

    AllClasses: DBService.GetAll("classes"),
    AllRaces: DBService.GetAll("races"),
    AllSpells: DBService.GetAll("spells"),
    AllCharacters: DBService.GetAll("characters"),
    character: new Character(),
    userID: "",

    LoadTamplate(isBuilding, isSpellsEditable) {
        return DBService.GetHTML("Template").then((text) => {
            mainDiv.innerHTML += text;
            if (isBuilding) {
                CoreBuilder.ShowBuildCharacter(isSpellsEditable);
            } else {
                var tab = document.getElementById("tab");
                tab.remove();
            }
        })
    },

    ShowBuildCharacter(isSpellsEditable) {
        var inputdiv = document.getElementById("Input");

        var btndiv = document.createElement("div");
        btndiv.className = "col--sm-1 my-1";
        inputdiv.appendChild(btndiv);

        var commitbtn = document.createElement("button");
        commitbtn.innerHTML = "Commit";
        commitbtn.id = "btnCommit"
        commitbtn.className = "btn btn-secondary";
        if (CoreBuilder.character.name != "empty" && CoreBuilder.character.class && CoreBuilder.character.race) {
            commitbtn.disabled = false;
        } else {
            commitbtn.disabled = true;
        }
        btndiv.appendChild(commitbtn);

        let spell = [];
        fromEvent(commitbtn, 'click').subscribe(async () => {
            for (const val of CoreBuilder.character.spells) {
                let data = await DBService.GetById("spells", val).toPromise();
                spell.push({
                    id: `${val}`,
                    name: `${data.name}`
                });
            }

            let model = {
                name: `${CoreBuilder.character.name}`,
                class: `${CoreBuilder.character.class}`,
                race: `${CoreBuilder.character.race}`,
                spells: spell
            };

            DBService.PostById("characters", model).then((el) => {
                console.log(el);
                mainDiv.innerHTML = "";
                CharacterService.ShowCharactersTable();
            });
        });

        document.querySelector("#NameTab").onclick = function () {
            mainDiv.innerHTML = "";
            CharacterService.ShowAddCharacter(true);
        }

        document.querySelector("#ClassesTab").onclick = function () {
            mainDiv.innerHTML = "";
            ClassService.ShowClassesTable(true);
        }

        document.querySelector("#RacesTab").onclick = function () {
            mainDiv.innerHTML = "";
            RaceService.ShowRacesTable(true);
        }

        document.querySelector("#SpellsTab").onclick = function () {
            mainDiv.innerHTML = "";
            SpellService.ShowSpellsTable(true);
        }

        DBService.GetCharactersHTML("Character").then((text) => {
            var characterDiv = document.getElementById("characterDiv");
            characterDiv.innerHTML += text;

            var CharacterName = document.getElementById("CharacterName");
            var CharacterClass = document.getElementById("CharacterClass");
            var CharacterRace = document.getElementById("CharacterRace");
            var CharacterSpells = document.getElementById("CharacterSpells");
            zip(
                DBService.GetById("classes", this.character.class),
                DBService.GetById("races", this.character.race),
                DBService.GetAll("spells").pipe(toArray())
            ).subscribe(([clas, race, spells]) => {
                let showrace = new Race(race);
                let showclass = new Class(clas);
                let showspells = "";

                if (this.character.spells) {
                    spells.forEach((y) => {
                        this.character.spells.forEach((x) => {
                            if (x == y.id) {
                                showspells += `<li class='li'>${y.id} ${y.name}</li>`;
                            }
                        })
                    })
                }

                CharacterName.innerHTML = this.character.name;
                CharacterClass.innerHTML = showclass.name;
                CharacterRace.innerHTML = showrace.name;
                CharacterSpells.innerHTML = showspells;

                if (isSpellsEditable)
                    document.querySelectorAll('.li').forEach(x => x.onclick = () => {
                        deleteSpellsOnClick();
                    });
            });
        });
    },

    fillTable(status, isBuilding, list) {
        return new Promise((res, rej) => {
            let thead = document.getElementById("thead");
            let tbody = document.getElementById("tbody");

            if (list) {
                MakeRows(tbody, status, isBuilding, list)
            }
            else {
                function headerFrom(model) {
                    model.atributeList().map((atrr) => { thead.innerHTML += `<th scope='col'>${atrr}</th>` });
                }
                switch (status) {
                    case "Classes": headerFrom(Class); break;
                    case "Races": headerFrom(Race); break;
                    case "Spells": headerFrom(Spell); break;
                    case "Characters": headerFrom(Character); break;
                }

                this['All' + status]
                    .pipe(
                        map(obj => {
                            switch (status) {
                                case "Classes": return new Class(obj);
                                case "Races": return new Race(obj);
                                case "Spells": return new Spell(obj);
                                case "Characters": return new Character(obj);
                            }
                        }),
                        toArray()).subscribe((list) => {
                            MakeRows(tbody, status, isBuilding, list);
                            res(list.length);
                        });
            }
        })

    }
}

async function MakeRows(tbody, status, isBuilding, list) {
    tbody.innerHTML = "";
    let rowTamplate = await DBService["Get" + status + "HTML"](status + "Row");
    let inner = ""

    list.map((obj) => {
        if (status != "Characters") {
            inner += rowTamplate.populate(obj);
        } else {
            CharacterService.FillClassRow(obj).then((text) => tbody.innerHTML += text);
        }
    });
    tbody.innerHTML = inner;
    if (isBuilding)
        document.querySelectorAll('[test-click]').forEach(x => x.onclick = () => {
            switch (status) {
                case "Classes": return changeValue('class', x);
                case "Races": return changeValue('race', x);
                case "Spells": return addSpell(x);
            }
        });
}

function changeValue(string, row) {
    CoreBuilder.character[string] = row.cells[0].innerHTML;
    var label = document.getElementById("Character" + string.charAt(0).toUpperCase() + string.slice(1));
    label.innerHTML = row.cells[1].innerHTML;
    if (CoreBuilder.character.name != "empty" && CoreBuilder.character.class && CoreBuilder.character.race) {
        document.getElementById("btnCommit").disabled = false;
    } else {
        document.getElementById("btnCommit").disabled = true;
    }
}

function addSpell(row) {
    if (!CoreBuilder.character.spells.includes(row.cells[0].innerHTML)) {
        CoreBuilder.character.spells.push(row.cells[0].innerHTML);
        var label = document.getElementById("CharacterSpells");
        label.innerHTML += `<li class='li'>${row.cells[0].innerHTML} ${row.cells[1].innerHTML}</li>`;
        deleteSpellsOnClick();
    }
}

function deleteSpellsOnClick() {
    document.querySelectorAll('.li').forEach(x => x.onclick = () => {
        x.remove();
        CoreBuilder.character.spells = CoreBuilder.character.spells.filter((spell) => {
            return x.innerHTML.slice(0, 1) != spell;
        });
    });
}