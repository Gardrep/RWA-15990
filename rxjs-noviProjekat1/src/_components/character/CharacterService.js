import { fromEvent, zip } from 'rxjs';
import { Global } from "../../Global.js";
import { mainDiv } from '../../index.js';

import { Race } from '../../_models/Race.js';
import { Class } from "../../_models/Class.js";
import { Character } from "../../_models/Character.js";
import { DBService } from "../../_services/DBService.js";



export const CharacterService = {

    AllCharacters: DBService.GetAll("characters"),

    AddCharacter() {
        var inputdiv = document.createElement("div");
        inputdiv.className = "form-row align-items-center";
        mainDiv.appendChild(inputdiv);

        var btndiv = document.createElement("div");
        btndiv.className = "col--sm-1 my-1";
        inputdiv.appendChild(btndiv);

        var commitbtn = document.createElement("button");
        commitbtn.innerHTML = "Commit";
        commitbtn.className = "btn btn-primary";
        btndiv.appendChild(commitbtn);

        btndiv = document.createElement("div");
        btndiv.className = "col--sm-1 my-1";
        inputdiv.appendChild(btndiv);

        var discardbtn = document.createElement("button");
        discardbtn.innerHTML = "Discard/Build new";
        discardbtn.className = "btn btn-primary";
        btndiv.appendChild(discardbtn);

        let spell = [];

        fromEvent(commitbtn, 'click').subscribe(async () => {
            for (const val of Global.character.spells) {
                let data = await DBService.Get("spells", val).toPromise();
                spell.push({
                    id: `${val}`,
                    name: `${data.name}`
                });
            }

            let model = {
                name: `${Global.character.name}`,
                class: `${Global.character.class}`,
                race: `${Global.character.race}`,
                spells: spell
            };

            DBService.PostById("characters", model).then(() => {
                mainDiv.innerHTML = "";
                this.ShowCharactersTable();
            });
        });

        fromEvent(discardbtn, 'click').subscribe(function () {
            Global.ShowBuild();
        });
    },

    ShowAddCharacter() {
        mainDiv.innerHTML = `
        <div class="container-fluid">
            <blockquote class="blockquote">
                <p class="mb-0">Here you can choose characteristics for your character.</p>
                <p class="mb-0">First choose your name.</p>
            </blockquote>
        </div>
        `;
        DBService.GetHTML("Template").then((text) => {
            mainDiv.innerHTML += text;
            Global.Crtaj(false);

            let name = document.getElementById('InputName');
            fromEvent(name, 'change').subscribe(function () {
                Global.character.name = name.value;
                var CharacterName = document.getElementById("CharacterName");
                CharacterName.innerHTML = name.value;
            });
        });
    },

    ShowCharactersTable() {
        DBService.GetHTML("Template").then((text) => {
            mainDiv.innerHTML += text;

            var search = document.getElementById("InputName");

            const input = fromEvent(search, 'input');
            input.subscribe((typed) => {
                var filter;
                filter = typed.target.value.toUpperCase();
                this.AllCharacters.subscribe((list) => {
                    list = list.map(character => { return new Character(character) });
                    list = list.filter(character => {
                        return character.name.toUpperCase().indexOf(filter) >= 0
                    });
                    Global.FillTable("Characters", false, list);
                })
            });
            Global.FillTable("Characters", false);
        });
    },

    FillClassRow(character) {
        zip(
            DBService.Get("classes", character.class),
            DBService.Get("races", character.race)
        ).subscribe(([clas, race]) => {
            let showrace = new Race(race);
            let showclass = new Class(clas);
            return `
            <td>${character.id}</td>
            <td>${character.name}</td>
            <td>${showclass.name}</td>
            <td>${showrace.name}</td>
            <td>${character.spells}</td>
            `}
        );
    }
}