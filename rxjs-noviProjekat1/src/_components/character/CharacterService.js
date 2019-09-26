import { fromEvent, zip } from 'rxjs';
import {  map,filter, toArray } from 'rxjs/operators';
import { CoreBuilder } from "../../CoreBuilder.js";
import { mainDiv } from '../../index.js';

import { Race } from '../../_models/Race.js';
import { Class } from "../../_models/Class.js";
import { Character } from "../../_models/Character.js";

import { DBService } from "../../_services/DBService.js";

export const CharacterService = {

    AllCharacters: DBService.GetAll("characters"),

    async ShowAddCharacter() {
        await DBService.GetCharactersHTML("CharacterText").then((html) => {
            mainDiv.innerHTML = html;
        });
        DBService.GetHTML("Template").then((text) => {
            mainDiv.innerHTML += text;
            CoreBuilder.ShowBuildCharacter(false);

            let name = document.getElementById('InputName');
            fromEvent(name, 'change').subscribe(function () {
                CoreBuilder.character.name = name.value;
                var CharacterName = document.getElementById("CharacterName");
                CharacterName.innerHTML = name.value;
            });
        });
    },

    ShowCharactersTable() {
        CoreBuilder.LoadTamplate(false, false).then(() => {
            var search = document.getElementById("InputName");

            const input = fromEvent(search, 'input');
            input.subscribe((typed) => {
                var filterName;
                filterName = typed.target.value.toUpperCase();
                this.AllCharacters.pipe(
                    map(character => new Character(character)),
                    filter(character => filterName == "" || character.name.toUpperCase().includes(filterName)),
                    toArray()
                ).subscribe(list => CoreBuilder.fillTable("Characters", false, list))
            });
            CoreBuilder.fillTable("Characters", false);
        });
    },

    FillClassRow(character) {
        return new Promise((res, rej) => {
            zip(
                DBService.GetById("classes", character.class),
                DBService.GetById("races", character.race)
            ).subscribe(([clas, race]) => {
                let showrace = new Race(race);
                let showclass = new Class(clas);
                let row;
                DBService.GetCharactersHTML("CharactersRow").then((text) => {
                    row = text;
                    let scope = { id: character.id, name: character.name, class: showclass.name, race: showrace.name, spells: character.spells };
                    res(row.populate(scope));
                });
            });
        });
    }
}