import { Global } from "../Global.js";
import { fromEvent, zip } from 'rxjs';
import { Character } from "../_models/Character.js";
import { ClassService } from "./ClassService.js";
import { DBService } from "./DBService.js";
import { Race } from '../_models/Race.js';
import { Class } from "../_models/Class.js";
import { switchMap } from 'rxjs/operators';
import { async } from "rxjs/internal/scheduler/async";

export const CharacterService = {

    AllCharacters: DBService.GetAll("characters"),

    AddCharacter(mainDiv) {
        Global.Crtaj(mainDiv);
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
                this.ShowCharactersTable(mainDiv);
            });
        });



        fromEvent(discardbtn, 'click').subscribe(function () {
            Global.ShowBuild();
        });
    },

    ShowAddCharacter(mainDiv) {
        Global.Crtaj(mainDiv);
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

        var serchdiv = document.createElement("div");
        serchdiv.className = "col-sm-4 my-1";
        inputdiv.appendChild(serchdiv);

        var search = document.createElement("input");
        search.type = "text";
        search.id = "myInput";
        search.placeholder = "Enter name ...";
        search.className = "form-control";
        serchdiv.appendChild(search);

        fromEvent(commitbtn, 'click').subscribe(function () {
            let name = document.getElementById('myInput').value
            Global.character.name = name;
            mainDiv.innerHTML = `
            <div class="container-fluid">
                <blockquote class="blockquote">
                    <p class="mb-0">Choose your class.</p>
                </blockquote>
            </div>
            `;
            Global.Crtaj(mainDiv);
            ClassService.ShowClassesTable(mainDiv, true);
        });
    },

    ShowCharactersTable(mainDiv) {
        var inputdiv = document.createElement("div");
        inputdiv.className = "form-row align-items-center";
        mainDiv.appendChild(inputdiv);

        var serchdiv = document.createElement("div");
        serchdiv.className = "col-sm-3 my-1";
        inputdiv.appendChild(serchdiv);

        var search = document.createElement("input");
        search.type = "text";
        search.id = "myInput";
        search.placeholder = "Search for names..";
        search.className = "form-control";
        serchdiv.appendChild(search);

        const input$ = fromEvent(search, 'input');
        input$.subscribe((typed) => {
            var filter;
            filter = typed.target.value.toUpperCase();
            this.AllCharacters.subscribe((list) => {
                list = list.map(character => { return new Character(character) });
                list = list.filter(character => {
                    return character.name.toUpperCase().indexOf(filter) >= 0
                });
                this.FillTable(body, list);
            })
        });

        var tabela = document.createElement("table");
        tabela.className = "table table-striped table-hover";
        mainDiv.appendChild(tabela);

        var header = document.createElement("thead");
        tabela.appendChild(header);
        header.innerHTML = `
        <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Class</th>
        <th scope="col">Race</th>
        <th scope="col">Spells</th>
        </tr>
        `;
        var body = document.createElement("tbody");
        body.innerHTML = "";
        tabela.appendChild(body);

        this.FillTable(body);
    },

    FillTable(body, list) {
        if (list) {
            this.MakeRows(body, list)
        }
        else {
            this.AllCharacters.subscribe((list) => {
                list = list.map(character => { return new Character(character) });
                this.MakeRows(body, list);
            });
        }
    },

    MakeRows(body, list) {
        body.innerHTML = "";
        let item;
        list.forEach((character) => {
            item = document.createElement("tr");
            body.appendChild(item);
            this.FillClassRow(item, character);
            item.scope = "row";
        });
    },

    FillClassRow(row, character) {
        zip(
            DBService.Get("classes", character.class),
            DBService.Get("races", character.race)
        ).subscribe(([clas, race]) => {
            let showrace = new Race(race);
            let showclass = new Class(clas);
            row.innerHTML += `
            <td>${character.id}</td>
            <td>${character.name}</td>
            <td>${showclass.name}</td>
            <td>${showrace.name}</td>
            <td>${character.spells}</td>
            `}
        );
    }
}