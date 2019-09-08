import { fromEvent, range, from } from 'rxjs';
import { filter, toArray } from 'rxjs/operators';
import { Global } from "../../Global.js";
import { mainDiv } from '../../index.js';

import { Spell } from "../../_models/Spell.js";
import { DBService } from "../../_services/DBService.js";

export const SpellService = {
    ShowSpellsTable(showRadio) {
        DBService.GetHTML("Template").then((text) => {
            mainDiv.innerHTML += text;

            if (showRadio) Global.Crtaj(true);

            //----------------------------------------------------------NAME
            const input = fromEvent(document.getElementById("InputName"), 'input');
            input.subscribe(() => {
                Filter(showRadio);
            });

            //----------------------------------------------------------LEVEL
            crateFilterButton("level");
            let AddLevel = (x) => {
                addLink(showRadio, "level", x);
            };
            AddLevel("Level");
            range(0, 10).subscribe(x => { AddLevel(x); });

            //----------------------------------------------------------RANGE
            crateFilterButton("range");
            const rangeOptions = from(Spell.rangeList());
            rangeOptions.subscribe(x => {
                addLink(showRadio, "range", x);
            });

            //----------------------------------------------------------RITUAL
            crateFilterButton("ritual");
            const ritualOptions = from(Spell.ritualList());
            ritualOptions.subscribe(x => {
                addLink(showRadio, "ritual", x);
            });

            //----------------------------------------------------------CLASSES
            crateFilterButton("class");
            //let classbtn = document.getElementById("classButton");
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
                    Filter(showRadio);
                });
            });

            //------------------------------------------------------------------TABELA
            Global.FillTable("Spells", showRadio);
        });
    }
}

function Filter(showRadio) {
    DBService.GetAll("spells").subscribe((list) => {
        list = list.map(spell => { return new Spell(spell); });
        let source = from(list);

        let filterName = document.getElementById("InputName").value.toUpperCase();
        let filterLevel = document.getElementById("levelButton").innerHTML;
        let filterRange = document.getElementById("rangeButton").innerHTML;
        let filterRitual = document.getElementById("ritualButton").innerHTML;
        let filterClasses = [];
        for (let pom of document.querySelectorAll(`input[name="cbx"]:checked`)) {
            filterClasses.push(pom.value);
        }


        source.pipe(
            filter(spell => {
                return filterName == "" || spell.name.toUpperCase().includes(filterName)
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
            toArray()
        ).subscribe(val => Global.FillTable("Spells", showRadio, val));
    });
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

function addLink(showRadio, type, x) {
    let link;
    let btn = document.getElementById(type + "Button");
    let menudiv = document.getElementById(type + "Menu");

    link = document.createElement("a");
    link.className = "dropdown-item";
    link.innerHTML = `${x}`;
    menudiv.appendChild(link);

    const observer = fromEvent(link, 'click');
    observer.subscribe((clickedLink) => {
        btn.innerHTML = clickedLink.path[0].innerHTML;
        Filter(showRadio);
    });
}