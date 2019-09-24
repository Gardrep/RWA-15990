import { fromEvent } from 'rxjs';
import { Global } from "../../Global.js";
import { mainDiv } from '../../index.js';

import { Race } from "../../_models/Race.js";
import { DBService } from "../../_services/DBService.js";
import { HTML } from '../../HTML.js';

export const RaceService = {

    ShowRacesTable(isBuilding) {
        if (isBuilding) {
            mainDiv.innerHTML = HTML.RacesText();;
        }
        Global.LoadTamplate(isBuilding, false).then(() => {
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
                    Global.FillTable("Races", isBuilding, list);
                })
            });
            Global.FillTable("Races", isBuilding);
        });
    }
}