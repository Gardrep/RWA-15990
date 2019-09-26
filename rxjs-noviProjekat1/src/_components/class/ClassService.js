import { fromEvent } from 'rxjs';
import { map, filter, toArray } from 'rxjs/operators';
import { CoreBuilder } from "../../CoreBuilder.js";
import { mainDiv } from '../../index.js';

import { Class } from "../../_models/Class.js";
import { DBService } from "../../_services/DBService.js";

export const ClassService = {

    async ShowClassesTable(isBuilding) {
        if (isBuilding) {
            await DBService.GetClassesHTML("ClassText").then((html) => {
                mainDiv.innerHTML = html;
            }); 
        }
        CoreBuilder.LoadTamplate(isBuilding, false).then(() => {

            var search = document.getElementById("InputName");
            const input = fromEvent(search, 'input');
            input.subscribe(() => {
                var filterName = search.value.toUpperCase();
                DBService.GetAll("classes").pipe(
                    map(clas => new Class(clas)),
                    filter(clas => filterName == "" || clas.name.toUpperCase().includes(filterName)),
                    toArray()
                ).subscribe((list) => { CoreBuilder.fillTable("Classes", isBuilding, list); })
            });
            CoreBuilder.fillTable("Classes", isBuilding);
        });
    },
}