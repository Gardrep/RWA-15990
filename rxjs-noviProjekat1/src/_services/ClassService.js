import { Global } from "../Global.js";
import { mainDiv } from '../index.js';
import { Observable, fromEvent } from 'rxjs';
import { Class } from "../_models/Class.js";
import { RaceService } from "./RaceService.js";
import { DBService } from "./DBService.js";

export const ClassService = {

    AllClasses: DBService.GetAll("classes"),

    /*GetClass(id) {
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
    },*/
    async GetHeaderHTML() {
        return await fetch('./src/_services/GetHeaderHTML.html')
            .then(function (response) {
                return response.text();
            })
            .then(function (res) {
                return res;
            });
    },
    async GetRowHTML() {
        return await fetch('./src/_services/GetRowHTML.html')
            .then(function (response) {
                return response.text();
            })
            .then(function (res) {
                return res;
            });
    },

    ShowClassesTable(showRadio) {
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
                mainDiv.innerHTML = `
                <div class="container-fluid">
                    <blockquote class="blockquote">
                        <p class="mb-0">Choose your race.</p>
                    </blockquote>
                </div>
                `;
                Global.Crtaj();
                RaceService.ShowRacesTable(true);
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
        this.GetHeaderHTML().then((text) => { header.innerHTML = text });

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
            this.AllClasses.subscribe((list) => {
                list = list.map(clas => { return new Class(clas); });
                this.MakeRows(body, showRadio, list)
            });
        }
    },

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
    },

    async FillClassRow(row, clas, showRadio) {
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

        let prom = await this.GetRowHTML();
        row.innerHTML += Global.populateHTML(prom, clas);
    }
}