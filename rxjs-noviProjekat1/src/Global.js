import { zip } from 'rxjs';
import { mainDiv } from './index.js'
import { Race } from './_models/Race.js';
import { Class } from "./_models/Class.js";
import { Character } from './_models/Character.js';
import {CharacterService} from './_services/CharacterService.js';
import { DBService } from "./_services/DBService.js";

export const Global = {

    character: new Character(),
    userID: "",
    Crtaj(mainDiv) {
        var tabela = document.createElement("table");
        tabela.className = "table table-striped table-hover";
        mainDiv.appendChild(tabela);

        var header = document.createElement("thead");
        tabela.appendChild(header);
        header.innerHTML = `
        <tr>
        <th scope="col">Your Characters Name</th>
        <th scope="col">Class</th>
        <th scope="col">Race</th>
        <th scope="col">Spells</th>
        </tr>
        `;
        var body = document.createElement("tbody");
        tabela.appendChild(body);

        var row = document.createElement("tr");
        row.scope = "row";
        body.appendChild(row);

        zip(
            DBService.Get("classes", this.character.class),
            DBService.Get("races", this.character.race),
            DBService.GetAll("spells")
        ).subscribe(([clas, race, spells]) => {
            let showrace = new Race(race);
            let showclass = new Class(clas);
            let showspells = "";
            let spel, i;

            if (this.character.spells) {
                spells.forEach((y) => {
                    this.character.spells.forEach((x) => {
                        if (x == y.id) {
                            showspells += y.name + ", ";
                        }
                    })
                })
            }
            row.innerHTML += `
            <td>${this.character.name}</td>
            <td>${showclass.name}</td>
            <td>${showrace.name}</td>
            <td>${showspells.slice(0, -2)}</td>
            `
        });
    },

    ShowBuild() {
        Global.character = new Character();
        mainDiv.innerHTML = `
        <div class="container-fluid">
            <blockquote class="blockquote">
                <p class="mb-0">Here you can choose characteristics for your character.</p>
                <p class="mb-0">First choose your name.</p>
            </blockquote>
        </div>
        `;
        var divTabela = document.createElement("div");
        mainDiv.appendChild(divTabela);

        CharacterService.ShowAddCharacter(mainDiv);
    }
}