import { fromEvent } from 'rxjs';
import { Global } from "../Global.js";
import { mainDiv } from '../index.js';

import { Class } from "../_models/Class.js";
import { DBService } from "./DBService.js";

export const ClassService = {

    AllClasses: DBService.GetAll("classes"),

    ShowClassesTable(showRadio) {
        if (showRadio) {
            mainDiv.innerHTML = `
            <div class="container-fluid">
                <blockquote class="blockquote">
                    <p class="mb-0">Choose your class.</p>
                </blockquote>
            </div>
            `;
        }
        Global.GetHTML("Template").then((text) => {
            mainDiv.innerHTML += text;

            if (showRadio) {
                Global.Crtaj(false);
            }

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