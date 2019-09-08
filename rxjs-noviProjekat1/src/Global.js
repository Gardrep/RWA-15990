import { zip } from 'rxjs';
import { mainDiv } from './index.js'

import { Character } from './_models/Character.js';
import { Class } from "./_models/Class.js";
import { Race } from './_models/Race.js';
import { Spell } from './_models/Spell.js';

import { CharacterService } from './_services/CharacterService.js';
import { ClassService } from './_services/ClassService.js';
import { RaceService } from './_services/RaceService.js';
import { SpellService } from './_services/SpellService.js';

import { DBService } from "./_services/DBService.js";
import { HTML } from './_services/HTML.js';

const saferEval = require('safer-eval');

export const Global = {

    AllClasses: DBService.GetAll("classes"),
    AllRaces: DBService.GetAll("races"),
    AllSpells: DBService.GetAll("spells"),
    AllClasses: DBService.GetAll("Classes"),
    character: new Character(),
    userID: "",
    Crtaj(isSpellsEditable) {

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

        Global.GetHTML("Character").then((text) => {
            var characterDiv = document.getElementById("characterDiv");
            characterDiv.innerHTML += text;

            var CharacterName = document.getElementById("CharacterName");
            var CharacterClass = document.getElementById("CharacterClass");
            var CharacterRace = document.getElementById("CharacterRace");
            var CharacterSpells = document.getElementById("CharacterSpells");
            zip(
                DBService.Get("classes", this.character.class),
                DBService.Get("races", this.character.race),
                DBService.GetAll("spells")
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

                if(isSpellsEditable)
                document.querySelectorAll('.li').forEach(x => x.onclick = () => {
                    deleteSpellsOnClick();
                });
            });
        });
    },

    populateHTML(html, promenljiva) {
        let m;
        let reg = new RegExp('{{ ?(#[A-Za-z]+ )?[A-Za-z]+.[A-Za-z]* }}', 'g');
        // do {
        //     m = reg.exec(html);
        //     if (m) {
        //         let prop = m[0].slice(3, -3).trim();
        //         html = html.replace(m[0], saferEval(prop, promenljiva));
        //     }
        // }
        // while (m);
        html = html.replace(reg, (prop) => {
            if (prop) {
                prop = prop.replace(/{/g, '').replace(/}/g, '').trim();

                return `${saferEval(prop, promenljiva)}`;
            }
        });

        return html;
    },

    async GetHTML(name) {
        return await fetch('./src/_services/' + name + '.html')
            .then(function (response) {
                return response.text();
            })
            .then(function (res) {
                return res;
            });
    },

    FillTable(status, showRadio, list) {
        var thead = document.getElementById("thead");
        var tbody = document.getElementById("tbody");

        if (list) {
            this.MakeRows(tbody, status, showRadio, list)
        }
        else {
            switch (status) {
                case "Classes": Class.atributeList().map((atrr) => { thead.innerHTML += `<th scope='col'>${atrr}</th>` }); break;
                case "Races": Race.atributeList().map((atrr) => { thead.innerHTML += `<th scope='col'>${atrr}</th>` }); break;
                case "Spells": Spell.atributeList().map((atrr) => { thead.innerHTML += `<th scope='col'>${atrr}</th>` }); break;
                case "Characters": Character.atributeList().map((atrr) => { thead.innerHTML += `<th scope='col'>${atrr}</th>` }); break;
            }
            //Global.GetHTML(status + "Header").then((text) => { thead.innerHTML = text });

            this['All' + status].subscribe((list) => {
                list = list.map(obj => {
                    switch (status) {
                        case "Classes": return new Class(obj);
                        case "Races": return new Race(obj);
                        case "Spells": return new Spell(obj);
                        case "Characters": return new Character(obj);
                    }
                });
                this.MakeRows(tbody, status, showRadio, list)
            });
        }
    },

    async MakeRows(tbody, status, showRadio, list) {
        tbody.innerHTML = "";
        let tamplate = await this.GetHTML(status + "Row");
        let inner = ""
        list.map((obj) => {
            if(status != "Characters"){
                inner += HTML[status+"Tamplate"](obj);
                //inner += this.populateHTML(tamplate, obj);
            }else{
                inner += CharacterService.FillClassRow(obj);
            }
        });

        tbody.innerHTML = inner;

        if (showRadio)
            document.querySelectorAll('[test-click]').forEach(x => x.onclick = () => {
                switch (status) {
                    case "Classes": return changeValue('class', x);
                    case "Races": return changeValue('race', x);
                    case "Spells": return addSpell(x);
                }
            });

    }
}

function changeValue(string, row) {
    Global.character[string] = row.cells[0].innerHTML;
    var label = document.getElementById("Character"+string.charAt(0).toUpperCase() + string.slice(1));
    label.innerHTML = row.cells[1].innerHTML;
}

function addSpell(row) {
    if(!Global.character.spells.includes(row.cells[0].innerHTML)){
        Global.character.spells.push(row.cells[0].innerHTML);
        var label = document.getElementById("CharacterSpells");
        label.innerHTML += `<li class='li'>${row.cells[0].innerHTML} ${row.cells[1].innerHTML}</li>`;
        deleteSpellsOnClick();
    }
}

function deleteSpellsOnClick(){
    document.querySelectorAll('.li').forEach(x => x.onclick = () => {
        x.remove();
        console.log(Global.character.spells);
        Global.character.spells = Global.character.spells.filter((spell)=>{
            return x.innerHTML.slice(0,1)!=spell;
            console.log(x.innerHTML.slice(0,1));
            console.log(spell);
            console.log(Global.character.spells);
        });
        console.log(Global.character.spells);
    });
}

