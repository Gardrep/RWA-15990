import { Global } from "../Global.js";
import { mainDiv } from '../index.js';
import { Observable, fromEvent } from 'rxjs';
import { Class } from "../_models/Class.js";
import { RaceService } from "./RaceService.js";
import { DBService } from "./DBService.js";

export const ClassService = {

    AllClasses: DBService.GetAll("classes"),

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
                Global.FillTable(body, "Classes", showRadio, list);
            })
        });

        var tabela = document.createElement("table");
        tabela.className = "table table-striped table-hover";
        mainDiv.appendChild(tabela);

        Global.FillTable(tabela, "Classes", showRadio);
    },
}