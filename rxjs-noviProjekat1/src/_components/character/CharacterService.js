import { fromEvent, zip } from 'rxjs';
import { Global } from "../../Global.js";
import { mainDiv } from '../../index.js';

import { Race } from '../../_models/Race.js';
import { Class } from "../../_models/Class.js";
import { Character } from "../../_models/Character.js";

import { DBService } from "../../_services/DBService.js";
import { HTML } from '../../HTML.js';

export const CharacterService = {

    AllCharacters: DBService.GetAll("characters"),

    ShowAddCharacter() {
        mainDiv.innerHTML = HTML.CharactersText();
        DBService.GetHTML("Template").then((text) => {
            mainDiv.innerHTML += text;
            Global.ShowBuildCharacter(false);

            let name = document.getElementById('InputName');
            fromEvent(name, 'change').subscribe(function () {
                Global.character.name = name.value;
                var CharacterName = document.getElementById("CharacterName");
                CharacterName.innerHTML = name.value;
            });
        });
    },

    ShowCharactersTable() {
        Global.LoadTamplate(false, false).then(() => {
            var search = document.getElementById("InputName");

            const input = fromEvent(search, 'input');
            input.subscribe((typed) => {
                var filter;
                filter = typed.target.value.toUpperCase();
                this.AllCharacters.subscribe((list) => {
                    list = list.map(character => { return new Character(character) });
                    list = list.filter(character => {
                        return character.name.toUpperCase().indexOf(filter) >= 0
                    });
                    Global.FillTable("Characters", false, list);
                })
            });
            Global.FillTable("Characters", false);
        });
    },

    FillClassRow(character) {
        return zip(
            DBService.Get("classes", character.class),
            DBService.Get("races", character.race)
        );
    },

    CharacterRow(character, clas, race) {
        let showrace = new Race(race);
        let showclass = new Class(clas);
        return HTML.CharactersTamplate(character, showrace, showclass);
    }
}