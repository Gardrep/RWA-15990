import { Global } from "./index.js";
import { Observable, fromEvent } from 'rxjs';
import { Class } from "./Class.js";
import { RaceService } from "./RaceService.js";
import { DBService } from "./DBService.js";

export class ClassService {

    constructor() {
        let DBMngr = new DBService();
        this.AllClasses = DBMngr.GetAll("classes");
    }

    GetClass(id) {
        if (!id) {
            return Observable.create(generator => { generator.next(new Class()); })
        }
        else {
            return Observable.create(generator => {
                fetch(`http://178.149.70.120:3000/classes/${id}`)
                    .then(x => x.json())
                    .then(data => {
                        generator.next(
                            new Class(data)
                        );
                    });
            });
        }
    }

    ShowClassesTable(mainDiv, showRadio) {
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
                Global.character.class = document.querySelector('input[name="exampleRadios"]:checked').value;
                let RaceMngr = new RaceService();
                mainDiv.innerHTML = `
                <div class="container-fluid">
                    <blockquote class="blockquote">
                        <p class="mb-0">Choose your race.</p>
                    </blockquote>
                </div>
                `;
                Global.Crtaj(mainDiv);
                RaceMngr.ShowRacesTable(mainDiv, true);
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

        const input$ = fromEvent(search, 'input');
        input$.subscribe((typed) => {
            var filter;
            filter = typed.target.value.toUpperCase();
            this.AllClasses.subscribe((list) => {
                list = list.map(clas => { return new Class(clas); });
                list = list.filter(clas => {
                    return clas.name.toUpperCase().indexOf(filter) >= 0
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
        <th scope="col">Class Name</th>
        <th scope="col">Description</th>
        <th scope="col">Hit Die</th>
        <th scope="col">Proficiency Choices</th>
        <th scope="col">Proficiencies</th>
        <th scope="col">Saving Throws</th>
        <th scope="col">Starting Equipment</th>
        <th scope="col">Class Level</th>
        <th scope="col">Subclasses</th>
        <th scope="col">Spellcasting</th>
        </tr>
        `;

        var body = document.createElement("tbody");
        body.innerHTML = "";
        tabela.appendChild(body);

        this.FillTable(body, showRadio);
    }

    FillTable(body, showRadio, list) {
        if (list) {
            this.MakeRows(body, showRadio, list)
        }
        else {
            this.AllClasses.subscribe((list) => {
                list = list.map(clas => { return new Class(clas); });
                this.MakeRows(body, showRadio, list)
            });
        }
    }

    MakeRows(body, showRadio, list) {
        body.innerHTML = "";
        let item;
        list.forEach((clas) => {
            item = document.createElement("tr");
            body.appendChild(item);
            this.FillClassRow(item, clas, showRadio);
            if (showRadio)
                item.onclick = function () { document.getElementById(`exampleRadios${clas.id}`).checked = true; };
            item.scope = "row";
        });
    }

    FillClassRow(row, clas, showRadio) {
        if (showRadio) {
            row.innerHTML += `
            <td>    
                <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios${clas.id}" value="${clas.id}" checked>
                    <label class="form-check-label" for="exampleRadios${clas.id}">
                    ${clas.id}
                    </label>
                </div>
            </td>
            `;
        }
        else {
            row.innerHTML += `
            <td>${clas.id}</td>
            `;
        }
        row.innerHTML += `
            <td>${clas.name}</td>
            <td>
                <button type="button" class="btn btn-sm btn-secondary" data-toggle="tooltip" data-placement="top" title="${clas.description}">
                description
                </button>
            </td>
            <td>${clas.hit_die}</td>
            <td>
                <button type="button" class="btn btn-sm btn-secondary" data-toggle="tooltip" data-placement="top" title="${clas.proficiency_choices}">
                proficiency choices
                </button>
            </td>
            <td>
                <button type="button" class="btn btn-sm btn-secondary" data-toggle="tooltip" data-placement="top" title="${clas.proficiencies}">
                proficiencies
                </button>
            </td>
            <td>${clas.saving_throws}</td>
            <td>${clas.starting_equipment}</td>
            <td>${clas.class_level}</td>
            <td>${clas.subclasses}</td>
            <td>${clas.spellcasting}</td>
        `;
    }
}