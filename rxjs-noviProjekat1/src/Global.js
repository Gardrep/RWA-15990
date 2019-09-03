import { zip } from 'rxjs';
import { mainDiv } from './index.js'
import { Race } from './_models/Race.js';
import { Class } from "./_models/Class.js";
import { Character } from './_models/Character.js';
import { CharacterService } from './_services/CharacterService.js';
import { DBService } from "./_services/DBService.js";
import { Spell } from './_models/Spell.js';
const saferEval = require('safer-eval');

export const Global = {

    AllClasses: DBService.GetAll("classes"),
    AllRaces: DBService.GetAll("races"),
    AllSpells: DBService.GetAll("spells"),
    character: new Character(),
    userID: "",
    Crtaj() {
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
        this.character = new Character();
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

    FillTable(tabela, status, showRadio, list) {
        var header = document.createElement("thead");
        tabela.appendChild(header);
        Global.GetHTML(status + "Header").then((text) => { header.innerHTML = text });

        var body = document.createElement("tbody");
        body.innerHTML = "";
        tabela.appendChild(body);

        if (list) {
            this.MakeRows(body, status, showRadio, list)
        }
        else {
            this['All' + status].subscribe((list) => {
                list = list.map(obj => {
                    switch (status) {
                        case "Classes": return new Class(obj);
                        case "Races": return new Race(obj);
                        case "Spells": return new Spell(obj);
                    }
                });
                this.MakeRows(body, status, showRadio, list)
            });
        }
    },

    async MakeRows(tbody, status, showRadio, list) {
        tbody.innerHTML = "";
        let tableRow;
        let tamplate = await this.GetHTML(status + "Row");
        let inner = ""
        const tbodytest = document.createElement("tbody");
        const rows = list.map((obj) => {
            
            // tableRow = document.createElement("tr");

            // tableRow.innerHTML += this.populateHTML(tamplate, obj);
            console.log("izvrseno");
            // if (showRadio)
            //     tableRow.onclick = () => {
            //         document.getElementById(`exampleRadios${obj.id}`).checked = true;
            //     };
            // tableRow.scope = "row";
            // tbody.appendChild(tableRow);
            inner += this.populateHTML(tamplate, obj);
        });

        tbody.innerHTML=inner;

        if (showRadio)
        document.querySelectorAll('[test-click]').forEach(x=>x.onclick = () => {
            document.getElementById(`exampleRadios${obj.id}`).checked = true;
        });

    }
}

function trClick() {
    document.getElementById(`exampleRadios${obj.id}`).checked = true;
}