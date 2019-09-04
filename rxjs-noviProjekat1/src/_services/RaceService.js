import { Global } from "../Global.js";
import { mainDiv } from '../index.js';
import { fromEvent } from 'rxjs';
import { Race } from "../_models/Race.js";
import { SpellService } from "./SpellService.js";
import { DBService } from "./DBService.js";

export const RaceService = {

    AllRaces: DBService.GetAll("races"),

    ShowRacesTable(showRadio) {
        Global.GetHTML("Template").then((text) => {
            mainDiv.innerHTML = text;
            /*if (showRadio) {
                var btndiv = document.createElement("div");
                btndiv.className = "col-auto my-1";
                inputdiv.appendChild(btndiv);
    
                var commitbtn = document.createElement("button");
                commitbtn.innerHTML = "Commit";
                commitbtn.className = "btn btn-primary";
                btndiv.appendChild(commitbtn);
    
                fromEvent(commitbtn, 'click').subscribe(function () {
                    const value = document.querySelector('input[name="exampleRadios"]:checked').value;
                    Global.character.race = document.querySelector('input[name="exampleRadios"]:checked').value;
                    if (showRadio) {
                        mainDiv.innerHTML = `
                    <div class="container-fluid">
                        <blockquote class="blockquote">
                            <p class="mb-0">Choose your spells.</p>
                        </blockquote>
                    </div>
                    `;
                    }
                    Global.Crtaj();
                    SpellService.ShowSpellsTable(true);
                });
            }*/

            var search = document.getElementById("InputName");

            const input = fromEvent(search, 'input');
            input.subscribe((typed) => {
                var filter;
                filter = typed.target.value.toUpperCase();
                this.AllRaces.subscribe((list) => {
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