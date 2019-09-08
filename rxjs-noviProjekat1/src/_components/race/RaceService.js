import { fromEvent } from 'rxjs';
import { Global } from "../../Global.js";
import { mainDiv } from '../../index.js';

import { Race } from "../../_models/Race.js";
import { DBService } from "../../_services/DBService.js";

export const RaceService = {

    ShowRacesTable(showRadio) {
        DBService.GetHTML("Template").then((text) => {
            mainDiv.innerHTML += text;

            if (showRadio) {
                Global.Crtaj(false);
            }

            var search = document.getElementById("InputName");

            const input = fromEvent(search, 'input');
            input.subscribe((typed) => {
                var filter;
                filter = typed.target.value.toUpperCase();
                DBService.GetAll("races").subscribe((list) => {
                    list = list.map(race => { return new Race(race); });
                    list = list.filter(race => {
                        return race.name.toUpperCase().indexOf(filter) >= 0
                    });
                    Global.FillTable("Races", showRadio, list);
                })
            });
            Global.FillTable("Races", showRadio);
        });
    }
}