import { CoreBuilder } from "./CoreBuilder.js";
import { Character } from './_models/Character.js';

import { merge } from 'rxjs/operators';
import { mapTo } from 'rxjs/operators';
import { interval } from 'rxjs';

import { ClassService } from "./_components/class/ClassService.js";
import { RaceService } from "./_components/race/RaceService.js";
import { SpellService } from "./_components/spell/SpellService.js";
import { CharacterService } from "./_components/character/CharacterService.js";
import { UserService } from "./_components/user/UserService.js";

import { DBService } from "./_services/DBService.js";

export const mainDiv = document.querySelector(".mainDiv");

//----RunOnStart----
ShowLogin();
ShowHome();

String.prototype.populate = function (scope) {
    var str = this.toString();
    var key;
    for (key in scope) {
        str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), scope[key]);
    }
    return str;
};

document.querySelector("#HomeLink").onclick = function () { ShowHome(); }

function ShowHome() {
    DBService.GetHomeTextHTML().then((html) => {
        mainDiv.innerHTML = html;
    });
    // mainDiv.innerHTML = `
    // <div class="bg container-fluid" id="prepravi">
    //     <blockquote class="blockquote">
    //         <h1 class="strokeme mb-0">There is a need for a comprehensive D&D Character Builder with all the needed components on display for easy accsess and use.</h1>
    //         <h1 class="strokeme mb-0">This system alows users to make an acount.</h1>
    //         <h1 class="strokeme mb-0">And alows you to make and see others character.</h1>
    //     </blockquote>
    // </div>
    // `;
}

document.querySelector("#BuildLink").onclick = function () {
    this.character = new Character();
    CharacterService.ShowAddCharacter();
}

document.querySelector("#ClassesLink").onclick = function () {
    mainDiv.innerHTML = "";
    ClassService.ShowClassesTable(false);
}

document.querySelector("#RacesLink").onclick = function () {
    mainDiv.innerHTML = "";
    RaceService.ShowRacesTable(false);
}

document.querySelector("#SpellsLink").onclick = function () {
    mainDiv.innerHTML = "";
    SpellService.ShowSpellsTable(false);
}

document.querySelector("#CharacterListLink").onclick = function () {
    mainDiv.innerHTML = "";
    CharacterService.ShowCharactersTable();
}

document.querySelector("#LoginLink").onclick = function () {
    mainDiv.innerHTML = "";
    UserService.ShowLogin();
}

function ShowLogin() {
    let token = localStorage.getItem('token');
    if (!token) {
        mainDiv.innerHTML = "";
        UserService.ShowLogin();
    }
    else {
        if (!CoreBuilder.userID) {
            CoreBuilder.userID = token;
            DBService.GetById("users", token).subscribe((user) => document.getElementById("LoginLink").innerHTML = "Logged in as " + user.username);
        }
    }
}