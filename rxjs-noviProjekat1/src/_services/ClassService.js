import { Global } from "../Global.js";
import { mainDiv } from '../index.js';
import { Observable, fromEvent } from 'rxjs';
import { Class } from "../_models/Class.js";
import { RaceService } from "./RaceService.js";
import { DBService } from "./DBService.js";

export const ClassService = {

    AllClasses: DBService.GetAll("classes"),

    ShowClassesTable(showRadio) {
        Global.GetHTML("Template").then((text) => {
            mainDiv.innerHTML = text;
        /*
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
*/
            var search = document.getElementById("InputName");

            const input = fromEvent(search, 'input');
            input.subscribe((typed) => {
                var filter;
                filter = typed.target.value.toUpperCase();
                this.AllClasses.subscribe((list) => {
                    list = list.map(clas => { return new Class(clas); });
                    list = list.filter(clas => {
                        return clas.name.toUpperCase().indexOf(filter) >= 0
                    });
                    Global.FillTable("Classes", showRadio, list);
                })
            });
            Global.FillTable("Classes", showRadio);
        });




    },
}