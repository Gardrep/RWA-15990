import { Global } from "./index.js";
import { fromEvent } from 'rxjs';
import { Spell } from "./Spell.js";
import { CharacterService } from "./CharacterService.js";
import { DBService } from "./DBService.js";

export class SpellService {

    constructor() {
        let DBMngr = new DBService();
        this.AllSpells = DBMngr.GetAll("spells");
    }

    ShowSpellsTable(mainDiv, showRadio) {
        var inputdiv = document.createElement("div");
        inputdiv.className = "form-row align-items-center";
        mainDiv.appendChild(inputdiv);
        if (showRadio) {
            var btndiv = document.createElement("div");
            btndiv.className = "col-auto my-1";
            inputdiv.appendChild(btndiv);

            var commitbtn = document.createElement("button");
            commitbtn.innerHTML = "Commit";
            commitbtn.className = "btn btn-primary";
            btndiv.appendChild(commitbtn);

            fromEvent(commitbtn, 'click').subscribe(function () {
                Global.character.spells = [];
                document.querySelectorAll('input[name="exampleRadios"]:checked').forEach((spel) => {
                    Global.character.spells.push(spel.value);
                });
                let CharacterMngr = new CharacterService();
                mainDiv.innerHTML = "";
                CharacterMngr.AddCharacter(mainDiv);
            });
        }
        var serchdiv = document.createElement("div");
        serchdiv.className = "col-sm-2 my-1";
        inputdiv.appendChild(serchdiv);
        var search = document.createElement("input");
        search.type = "text";
        search.id = "myInput";
        search.placeholder = "Search for names..";
        search.className = "form-control";
        serchdiv.appendChild(search);

        const input = fromEvent(search, 'input');
        input.subscribe(() => {
            this.Filter(body, showRadio);
        });

        var leveldiv = document.createElement("div");
        leveldiv.className = "col-sm-2 my-1";
        inputdiv.appendChild(leveldiv);

        var levelbtndiv = document.createElement("div");
        levelbtndiv.className = "btn-group";
        leveldiv.appendChild(levelbtndiv);

        var levelbtn = document.createElement("button");
        levelbtn.innerHTML = "Level";
        levelbtn.className = "btn btn-secondary btn-sm dropdown-toggle";
        levelbtn.id = "levelID";
        levelbtn.type = "button";
        levelbtn.setAttribute("data-toggle", "dropdown");
        levelbtn.setAttribute("aria-haspopup", "true");
        levelbtn.setAttribute("aria-expanded", "false");
        levelbtndiv.appendChild(levelbtn);

        var levelmenudiv = document.createElement("div");
        levelmenudiv.className = "dropdown-menu";
        levelbtndiv.appendChild(levelmenudiv);

        let i, levellink;
        for (i = 0; i < 10; i++) {
            levellink = document.createElement("a");
            levellink.className = "dropdown-item";
            levellink.innerHTML = `${i}`;
            levelmenudiv.appendChild(levellink);

            const level$ = fromEvent(levellink, 'click');
            level$.subscribe((chosenlevel) => {
                levelbtn.innerHTML = chosenlevel.path[0].innerHTML;
                this.Filter(body, showRadio);
            });
        }

        var ritualldiv = document.createElement("div");
        ritualldiv.className = "col-sm-1 my-1";
        inputdiv.appendChild(ritualldiv);

        var ritualbtndiv = document.createElement("div");
        ritualbtndiv.className = "btn-group";
        ritualldiv.appendChild(ritualbtndiv);

        var ritualbtn = document.createElement("button");
        ritualbtn.innerHTML = "Ritual";
        ritualbtn.className = "btn btn-secondary btn-sm dropdown-toggle";
        ritualbtn.id = "RitualID";
        ritualbtn.type = "button";
        ritualbtn.setAttribute("data-toggle", "dropdown");
        ritualbtn.setAttribute("aria-haspopup", "true");
        ritualbtn.setAttribute("aria-expanded", "false");
        ritualbtndiv.appendChild(ritualbtn);

        var ritualmenudiv = document.createElement("div");
        ritualmenudiv.className = "dropdown-menu";
        ritualbtndiv.appendChild(ritualmenudiv);

        let rituallink;
        rituallink = document.createElement("a");
        rituallink.className = "dropdown-item";
        rituallink.innerHTML = "yes";
        ritualmenudiv.appendChild(rituallink);

        var ritual$ = fromEvent(rituallink, 'click');
        ritual$.subscribe((chosenritual) => {
            ritualbtn.innerHTML = chosenritual.path[0].innerHTML;
            this.Filter(body, showRadio);
        });

        rituallink = document.createElement("a");
        rituallink.className = "dropdown-item";
        rituallink.innerHTML = "no";
        ritualmenudiv.appendChild(rituallink);

        ritual$ = fromEvent(rituallink, 'click');
        ritual$.subscribe((chosenritual) => {
            ritualbtn.innerHTML = chosenritual.path[0].innerHTML;
            this.Filter(body, showRadio);
        });


        var tabela = document.createElement("table");
        tabela.className = "table table-striped table-hover";
        mainDiv.appendChild(tabela);

        var header = document.createElement("thead");
        tabela.appendChild(header);
        header.innerHTML = `
        <tr>
        <th scope="col">ID</th>
        <th scope="col">Spell Name</th>
        <th scope="col">Level</th>
        <th scope="col">Range</th>
        <th scope="col">Ritual</th>
        <th scope="col">Duration</th>
        <th scope="col">Concentration</th>
        <th scope="col">Casting_time</th>
        <th scope="col">School</th>
        <th scope="col">Classes</th>
        <th scope="col">Description</th>
        </tr>
        `;
        var body = document.createElement("tbody");
        body.innerHTML = "";
        tabela.appendChild(body);

        this.FillTable(body, showRadio);
    }

    FillTable(body, showRadio, list) {
        if (list) {
            this.MakeRows(body, showRadio, list)
        }
        else {
            this.AllSpells.subscribe((list) => {
                list = list.map(spell => { return new Spell(spell); });
                this.MakeRows(body, showRadio, list)
            });
        }
    }

    MakeRows(body, showRadio, list) {
        body.innerHTML = "";
        let item;
        list.forEach(spel => {
            item = document.createElement("tr");
            body.appendChild(item);
            this.FillSpellRow(item, spel, showRadio);
            if (showRadio)
                item.onclick = function () { document.getElementById(`exampleRadios${spel.id}`).checked = true; };
            item.scope = "row";
        });
    }

    FillSpellRow(row, spel, showRadio) {
        if (showRadio) {
            row.innerHTML += `
            <td>    
                <div class="input-group-text">
                    <input type="checkbox" aria-label="Checkbox input" name="exampleRadios" id="exampleRadios${spel.id}" value="${spel.id}" >
                    <label class="form-check-label" for="exampleRadios${spel.id}">
                        ${spel.id}
                    </label>
                </div>
            </td>
            `;
        }
        else {
            row.innerHTML += `
            <td>${spel.id}</td>
            `;
        }
        row.innerHTML += `
            <td>${spel.name}</td>
            <td>${spel.level}</td>
            <td>${spel.range}</td>
            <td>${spel.ritual}</td>
            <td>${spel.duration}</td>
            <td>${spel.concentration}</td>
            <td>${spel.casting_time}</td>
            <td>${spel.school}</td>
            <td>${spel.classes}</td>
            <td>
                <button type="button" class="btn btn-sm btn-secondary" data-toggle="tooltip" data-placement="left" title="${spel.desc}">
                description
                </button>
            </td>
        `;
    }

    Filter(body, showRadio) {
        this.AllSpells.subscribe((list) => {
            list = list.map(spell => { return new Spell(spell); });
            let filter;
            filter = document.getElementById("myInput").value.toUpperCase();
            if (filter != "") {
                list = list.filter(spell => {
                    return spell.name.toUpperCase().indexOf(filter) >= 0
                });
            }

            if (!isNaN(document.getElementById("levelID").innerHTML)) {
                list = list.filter(spell => {
                    return spell.level == document.getElementById("levelID").innerHTML;
                });
            }

            filter = document.getElementById("RitualID").innerHTML;
            if (this.strcmp(filter, "Ritual")) {

                list = list.filter(spell => {
                    return !spell.ritual.localeCompare(filter);
                });
            }
            this.FillTable(body, showRadio, list);
        });

    }
    strcmp(a, b) {
        return (a < b ? -1 : (a > b ? 1 : 0));
    }
}