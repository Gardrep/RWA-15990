import { fromEvent } from 'rxjs';
import { Global } from "../../Global.js";
import { mainDiv } from '../../index.js';

import { Class } from "../../_models/Class.js";
import { DBService } from "../../_services/DBService.js";
import { HTML } from '../../HTML.js';

export const ClassService = {

    ShowClassesTable(isBuilding) {
        if (isBuilding) {
            mainDiv.innerHTML = HTML.ClassesText();;
        }
        Global.LoadTamplate(isBuilding, false).then(()=>{

            var search = document.getElementById("InputName");
            const input = fromEvent(search, 'input');
            input.subscribe((typed) => {
                var filter;
                filter = typed.target.value.toUpperCase();
                DBService.GetAll("classes").subscribe((list) => {
                    list = list.map(clas => { return new Class(clas); });
                    list = list.filter(clas => {
                        return clas.name.toUpperCase().indexOf(filter) >= 0
                    });
                    Global.FillTable("Classes", isBuilding, list);
                })
            });
            Global.FillTable("Classes", isBuilding);
        });
    },
}