import { fromEvent } from 'rxjs';
import { CoreBuilder } from "../../CoreBuilder.js";
import { mainDiv } from '../../index.js';

import { Race } from "../../_models/Race.js";
import { DBService } from "../../_services/DBService.js";

export const RaceService = {

    async ShowRacesTable(isBuilding) {
        if (isBuilding) {
            await DBService.GetRacesHTML("RaceText").then((html) => {
                mainDiv.innerHTML = html;
            });
        }
        CoreBuilder.LoadTamplate(isBuilding, false).then(() => {
            var search = document.getElementById("InputName");

            const input = fromEvent(search, 'input');
            input.subscribe((typed) => {
                var filter;
                filter = typed.target.value.toUpperCase();
                DBService.GetAll("races").pipe(
                    map(race => new Race(race)),
                    filter(race => race.name.toUpperCase().includes(filter)),
                    toArray()
                ).subscribe(list => CoreBuilder.fillTable("Races", isBuilding, list))
            });
            CoreBuilder.fillTable("Races", isBuilding);
        });
    }
}