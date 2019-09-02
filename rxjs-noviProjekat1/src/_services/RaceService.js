import { Global } from "../Global.js";
import { mainDiv } from '../index.js';
import { fromEvent } from 'rxjs';
import { Race } from "../_models/Race.js";
import { SpellService } from "./SpellService.js";
import { DBService } from "./DBService.js";

export const RaceService = {

    AllRaces : DBService.GetAll("races"),

    ShowRacesTable(showRadio) {
        var inputdiv = document.createElement("div");
        inputdiv.className = "form-row align-items-center";
        mainDiv.appendChild(inputdiv);
        if (showRadio) {
            var btndiv = document.createElement("div");
            btndiv.className = "col-auto my-1";
            inputdiv.appendChild(btndiv);

            var commitbtn = document.createElement("button");
            commitbtn.innerHTML = "Commit";
            commitbtn.className = "btn btn-primary";
            btndiv.appendChild(commitbtn);

            fromEvent(commitbtn, 'click').subscribe(function () {
                const value = document.querySelector('input[name="exampleRadios"]:checked').value;
                Global.character.race = document.querySelector('input[name="exampleRadios"]:checked').value;
                if (showRadio) {
                    mainDiv.innerHTML = `
                <div class="container-fluid">
                    <blockquote class="blockquote">
                        <p class="mb-0">Choose your spells.</p>
                    </blockquote>
                </div>
                `;
                }
                Global.Crtaj();
                SpellService.ShowSpellsTable(true);
            });
        }
        var serchdiv = document.createElement("div");
        serchdiv.className = "col-sm-3 my-1";
        inputdiv.appendChild(serchdiv);

        var search = document.createElement("input");
        search.type = "text";
        search.id = "myInput";
        search.placeholder = "Search for names..";
        search.className = "form-control";
        serchdiv.appendChild(search);

        const input = fromEvent(search, 'input');
        input.subscribe((typed) => {
            var filter;
            filter = typed.target.value.toUpperCase();
            this.AllRaces.subscribe((list) => {
                list = list.map(race => { return new Race(race); });
                list = list.filter(race => {
                    return race.name.toUpperCase().indexOf(filter) >= 0
                });
                this.FillTable(body, showRadio, list);
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
        <th scope="col">Race Name</th>
        <th scope="col">Speed</th>
        <th scope="col">Ability Bonuses</th>
        <th scope="col">Size</th>
        <th scope="col">Starting Proficiencies</th>
        <th scope="col">Languages</th>
        <th scope="col">Traits</th>
        <th scope="col">Subraces</th>
        </tr>
        `;

        var body = document.createElement("tbody");
        body.innerHTML = "";
        tabela.appendChild(body);
        this.FillTable(body, showRadio);
    },

    FillTable(body, showRadio, list) {
        if (list) {
            this.MakeRows(body, showRadio, list)
        }
        else {
            this.AllRaces.subscribe((list) => {
                list = list.map(race => { return new Race(race); });
                this.MakeRows(body, showRadio, list)
            });
        }
    },

    MakeRows(body, showRadio, list) {
        body.innerHTML = "";
        let item;
        list.forEach(race => {
            item = document.createElement("tr");
            body.appendChild(item);
            this.FillRaceRow(item, race, showRadio);
            if (showRadio)
                item.onclick = function () { document.getElementById(`exampleRadios${race.id}`).checked = true; };
            item.scope = "row";
        });
    },

    FillRaceRow(row, race, showRadio) {
        if (showRadio) {
            row.innerHTML += `
            <td>    
                <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios${race.id}" value="${race.id}" checked>
                    <label class="form-check-label" for="exampleRadios${race.id}">
                    ${race.id}
                    </label>
                </div>
            </td>
            `;
        }
        else {
            row.innerHTML += `
            <td>${race.id}</td>
            `;
        }
        row.innerHTML += `
            <td>${race.name}</td>
            <td>${race.speed}</td>
            <td>${race.ability_bonuses}</td>
            <td>${race.size}</td>
            <td>${race.starting_proficiencies}</td>
            <td>${race.languages}</td>
            <td>${race.traits}</td>
            <td>${race.subraces}</td>
        `;
    }
}