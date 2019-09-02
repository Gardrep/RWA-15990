import { zip } from 'rxjs';
import { mainDiv } from './index.js'
import { Race } from './_models/Race.js';
import { Class } from "./_models/Class.js";
import { Character } from './_models/Character.js';
import {CharacterService} from './_services/CharacterService.js';
import { DBService } from "./_services/DBService.js";
import { Spell } from './_models/Spell.js';
const saferEval = require('safer-eval');

export const Global = {

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
    },

    populateHTML(html, promenljiva){
        console.log(promenljiva);

    //let reg = /\{(.*?)\}/;//
    //let reg = /(?<=% \{\{\{ )(.*)(?= \}\}\} )/
    let reg = /{{{?\s*.*?\s*}}}///{{{xx.yyyy.z}}}
    let m;

    reg = /{{?\s*.*?\s*}}///{{ asd }}
    do {
      m = reg.exec(html);

     
      if (m) {
        let prop = m[0].slice(3, -3).trim();//.replace(/\s/g, '');

        //let x = saferEval(prop, promenljiva);
        html = html.replace(m[0], saferEval(prop, promenljiva));
      }
    }
    while (m);

        return html;
    },

    // FillTable(body, showRadio, echoice, list) {
    //     if (list) {
    //         this.MakeRows(body, showRadio, list)
    //     }
    //     else {
    //         this.AllClasses.subscribe((list) => {
    //             list = list.map(obj => { 
    //                 switch(echoice){
    //                     case "Class": return new Class(obj);
    //                     case "Races": return new Race(obj);
    //                     case "Spells": return new Spell(obj);
    //                 }
    //             });
    //             this.MakeRows(body, showRadio, list)
    //         });
    //     }
    // },

    // MakeRows(body, showRadio, list) {
    //     body.innerHTML = "";
    //     let item;
    //     list.forEach((clas) => {
    //         item = document.createElement("tr");
    //         body.appendChild(item);
    //         this.FillClassRow(item, clas, showRadio);
    //         if (showRadio)
    //             item.onclick = function () { document.getElementById(`exampleRadios${clas.id}`).checked = true; };
    //         item.scope = "row";
    //     });
    // },

    // FillClassRow(row, clas, showRadio) {
    //     if (showRadio) {
    //         row.innerHTML += `
    //         <td>    
    //             <div class="form-check">
    //             <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios${clas.id}" value="${clas.id}" checked>
    //                 <label class="form-check-label" for="exampleRadios${clas.id}">
    //                 ${clas.id}
    //                 </label>
    //             </div>
    //         </td>
    //         `;
    //     }
    //     else {
    //         row.innerHTML += `
    //         <td>${clas.id}</td>
    //         `;
    //     }
    //     row.innerHTML += `
    //         <td>${clas.name}</td>
    //         <td>
    //             <button type="button" class="btn btn-sm btn-secondary" data-toggle="tooltip" data-placement="top" title="${clas.description}">
    //             description
    //             </button>
    //         </td>
    //         <td>${clas.hit_die}</td>
    //         <td>
    //             <button type="button" class="btn btn-sm btn-secondary" data-toggle="tooltip" data-placement="top" title="${clas.proficiency_choices}">
    //             proficiency choices
    //             </button>
    //         </td>
    //         <td>
    //             <button type="button" class="btn btn-sm btn-secondary" data-toggle="tooltip" data-placement="top" title="${clas.proficiencies}">
    //             proficiencies
    //             </button>
    //         </td>
    //         <td>${clas.saving_throws}</td>
    //         <td>${clas.starting_equipment}</td>
    //         <td>${clas.class_level}</td>
    //         <td>${clas.subclasses}</td>
    //         <td>${clas.spellcasting}</td>
    //     `;
    // }
}