import { fromEvent, range, from } from 'rxjs';
import { filter, toArray, map, skip, take } from 'rxjs/operators';
import { CoreBuilder } from "../../CoreBuilder.js";
import { mainDiv } from '../../index.js';

import { Spell } from "../../_models/Spell.js";
import { DBService } from "../../_services/DBService.js";

export const SpellService = {
    async ShowSpellsTable(isBuilding) {
        if (isBuilding) {
            await DBService.GetSpellsHTML("SpellText").then((html) => {
                mainDiv.innerHTML = html;
            }); 
        }
        CoreBuilder.LoadTamplate(isBuilding, false).then(async () => {

            //----------------------------------------------------------NAME
            const input = fromEvent(document.getElementById("InputName"), 'input');
            input.subscribe(() => {
                filterSpells(isBuilding);
            });

            //----------------------------------------------------------LEVEL
            crateFilterButton("level");
            let AddLevel = (x) => {
                addLink(isBuilding, "level", x);
            };
            AddLevel("Level");
            range(0, 10).subscribe(x => { AddLevel(x); });

            //----------------------------------------------------------RANGE
            crateFilterButton("range");
            const rangeOptions = from(Spell.rangeList());
            rangeOptions.subscribe(x => {
                addLink(isBuilding, "range", x);
            });

            //----------------------------------------------------------RITUAL
            crateFilterButton("ritual");
            const ritualOptions = from(Spell.ritualList());
            ritualOptions.subscribe(x => {
                addLink(isBuilding, "ritual", x);
            });

            //----------------------------------------------------------CLASSES
            crateFilterButton("class");
            let classmenudiv = document.getElementById("classMenu");

            let classinput, classLabel, pomDiv;
            const classOptions = from(Spell.classList());
            classOptions.subscribe(x => {
                pomDiv = document.createElement("div");
                pomDiv.classList.add("d-flex", "dropdown-item", "align-items-center")
                classmenudiv.appendChild(pomDiv);

                classinput = document.createElement("input");
                classinput.type = "checkbox";
                classinput.className = "mr-2";
                classinput.id = `${x}`;
                classinput.name = "cbx";
                classinput.value = `${x}`;
                pomDiv.appendChild(classinput);

                classLabel = document.createElement("span");
                classLabel.innerHTML = `${x}`;
                classLabel.htmlFor = `${x}`;
                pomDiv.appendChild(classLabel);
                classLabel.onclick = () => {
                    document.getElementById(`${x}`).checked = !document.getElementById(`${x}`).checked;
                }

                const class$ = fromEvent(classinput, 'click');
                class$.subscribe(() => {
                    filterSpells(isBuilding);
                });
            });

            //---------------------------------Pagination buttons
            var inputdiv = document.getElementById("Input");

            var div = document.createElement("div");
            div.className = "my-1";
            inputdiv.appendChild(div);
            var btn = document.createElement("button");
            btn.innerHTML = "<";
            btn.className = "btn btn-secondary btn-sm";
            btn.id = "previousPage";
            btn.type = "button";
            div.appendChild(btn);
            const previousPage$ = fromEvent(btn, 'click');
            previousPage$.subscribe(() => {
                if (page - 1 > 0) {
                    page--;
                    document.getElementById("currentPage").innerHTML = page;
                    filterSpells(isBuilding);
                }
            });

            var div = document.createElement("div");
            div.className = "my-1";
            div.innerHTML = page;
            div.className = "btn-secondary btn-sm";
            div.id = "currentPage";
            inputdiv.appendChild(div);
            const currentPage$ = fromEvent(div, 'click');
            currentPage$.subscribe(() => {
                page = 1;
                document.getElementById("currentPage").innerHTML = page;
                filterSpells(isBuilding);
            });

            var div = document.createElement("div");
            div.className = "my-1";
            inputdiv.appendChild(div);
            var btn = document.createElement("button");
            btn.innerHTML = ">";
            btn.className = "btn btn-secondary btn-sm";
            btn.id = "nextPage";
            btn.type = "button";
            div.appendChild(btn);
            const nextPage$ = fromEvent(btn, 'click');
            nextPage$.subscribe(() => {
                if (page + 1 < (number / pageSize) + 1) {
                    page++;
                    document.getElementById("currentPage").innerHTML = page;
                    filterSpells(isBuilding);
                }
            });

            from(CoreBuilder.fillTable("Spells", isBuilding)).subscribe((n) => {
                number = n;
                filterSpells(isBuilding);
            });
        });
    }
}

let page = 1;
let number = 0;
let pageSize = 10;

function filterSpells(isBuilding) {
    let filterName = document.getElementById("InputName").value.toUpperCase();
    let filterLevel = document.getElementById("levelButton").innerHTML;
    let filterRange = document.getElementById("rangeButton").innerHTML;
    let filterRitual = document.getElementById("ritualButton").innerHTML;
    let filterClasses = [];
    for (let pom of document.querySelectorAll(`input[name="cbx"]:checked`)) {
        filterClasses.push(pom.value);
    }

    DBService.GetAll("spells").pipe(
        map(spell => new Spell(spell)),
        filter(spell => {
            return filterName == "" || spell.name.toUpperCase().includes(filterName);
        }),
        filter(spell => {
            return isNaN(filterLevel) || spell.level == filterLevel;
        }),
        filter(spell => {
            return filterRange == "Range" || !spell.range.localeCompare(filterRange);
        }),
        filter(spell => {
            return filterRitual == "Ritual" || !spell.ritual.localeCompare(filterRitual);
        }),
        filter(spell => {
            return filterClasses.length == 0 || filterClasses.reduce((acc, x) => {
                return acc || spell.classes.includes(x);
            }, false)
        }),
        skip((page - 1) * pageSize),
        take(pageSize),
        toArray()
    ).subscribe(val => CoreBuilder.fillTable("Spells", isBuilding, val));
}

function crateFilterButton(type) {
    var inputdiv = document.getElementById("Input");

    var div = document.createElement("div");
    div.className = "my-1 mx-2";
    inputdiv.appendChild(div);

    var btndiv = document.createElement("div");
    btndiv.className = "btn-group";
    div.appendChild(btndiv);

    var btn = document.createElement("button");
    btn.innerHTML = type.charAt(0).toUpperCase() + type.slice(1);
    btn.className = "btn btn-secondary btn-sm dropdown-toggle";
    btn.id = type + "Button";
    btn.type = "button";
    btn.setAttribute("data-toggle", "dropdown");
    btn.setAttribute("aria-haspopup", "true");
    btn.setAttribute("aria-expanded", "false");
    btndiv.appendChild(btn);

    var menudiv = document.createElement("div");
    menudiv.className = "dropdown-menu";
    menudiv.id = type + "Menu";
    btndiv.appendChild(menudiv);
}

function addLink(isBuilding, type, x) {
    let link;
    let btn = document.getElementById(type + "Button");
    let menudiv = document.getElementById(type + "Menu");

    link = document.createElement("a");
    link.className = "dropdown-item";
    link.innerHTML = `${x}`;
    menudiv.appendChild(link);

    const observer = fromEvent(link, 'click');
    observer.subscribe(() => {
        btn.innerHTML = link.innerHTML;
        filterSpells(isBuilding);
    });
}