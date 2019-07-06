import { zip } from 'rxjs';
import { ClassService } from "./_services/ClassService.js";
import { RaceService } from "./_services/RaceService.js";
import { SpellService } from "./_services/SpellService.js";
import { CharacterService } from "./_services/CharacterService.js";
import { UserService } from './_services/UserService.js';
import { Race } from './_models/Race.js';
import { Class } from "./_models/Class.js";
import { DBService } from "./_services/DBService.js";
import { Character } from './_models/Character.js';

let DBMngr = new DBService();

export const Global = {
    character: new Character(),
    userID: "",
    Crtaj(mainDiv) {
        var tabela = document.createElement("table");
        tabela.className = "table table-striped table-hover";
        mainDiv.appendChild(tabela);

        var header = document.createElement("thead");
        tabela.appendChild(header);
        header.innerHTML = `
        <tr>
        <th scope="col">Your Characters Name</th>
        <th scope="col">Class</th>
        <th scope="col">Race</th>
        <th scope="col">Spells</th>
        </tr>
        `;
        var body = document.createElement("tbody");
        tabela.appendChild(body);

        var row = document.createElement("tr");
        row.scope = "row";
        body.appendChild(row);

        zip(
            DBMngr.Get("classes", this.character.class),
            DBMngr.Get("races", this.character.race),
            DBMngr.GetAll("spells")
        ).subscribe(([clas, race, spells]) => {
            let showrace = new Race(race);
            let showclass = new Class(clas);
            let showspells = "";
            let spel, i;

            if (this.character.spells) {
                spells.forEach((y) => {
                    this.character.spells.forEach((x) => {
                        if (x == y.id) {
                            showspells += y.name + ", ";
                        }
                    })
                })
            }
            row.innerHTML += `
            <td>${this.character.name}</td>
            <td>${showclass.name}</td>
            <td>${showrace.name}</td>
            <td>${showspells}</td>
            `
        });
    },

    ShowBuild() {
        Global.character = new Character();
        mainDiv.innerHTML = `
        <div class="container-fluid">
            <blockquote class="blockquote">
                <p class="mb-0">Here you can choose characteristics for your character.</p>
                <p class="mb-0">First choose your name.</p>
            </blockquote>
        </div>
        `;
        var divTabela = document.createElement("div");
        mainDiv.appendChild(divTabela);

        CharacterMngr.ShowAddCharacter(mainDiv);
    }
}

var mainDiv = document.querySelector(".mainDiv");

//----RunOnStart----
ShowHome();
let ClassMngr = new ClassService();
let RaceMngr = new RaceService();
let SpellMngr = new SpellService();
let CharacterMngr = new CharacterService();
let LoginMngr = new UserService();

let ClassesLink = document.querySelector("#ClassesLink");
ClassesLink.onclick = function () { mainDiv.innerHTML = ""; ClassMngr.ShowClassesTable(mainDiv, false); }

let RacesLink = document.querySelector("#RacesLink");
RacesLink.onclick = function () { mainDiv.innerHTML = ""; RaceMngr.ShowRacesTable(mainDiv, false); }

let SpellsLink = document.querySelector("#SpellsLink");
SpellsLink.onclick = function () { mainDiv.innerHTML = ""; SpellMngr.ShowSpellsTable(mainDiv, false); }

let CharacterListLink = document.querySelector("#CharacterListLink");
CharacterListLink.onclick = function () { mainDiv.innerHTML = ""; CharacterMngr.ShowCharactersTable(mainDiv); }

let BuildLink = document.querySelector("#BuildLink");
BuildLink.onclick = function () { Global.ShowBuild(); }

let LoginLink = document.querySelector("#LoginLink");
LoginLink.onclick = function () {
    let token = localStorage.getItem('token');
    if (!token) {
        mainDiv.innerHTML = "";
        LoginMngr.ShowLogin(mainDiv);
    }
    else {
        if(!Global.userID){
            Global.userID = token;
            let DBMngr = new DBService();
            DBMngr.Get("users", token).subscribe((user)=>document.getElementById("LoginLink").innerHTML = "Logged in as " + user.username);
        }
        else{
            mainDiv.innerHTML = "";
            LoginMngr.ShowLogin(mainDiv);
        }
    }
}

let HomeLink = document.querySelector("#HomeLink");
HomeLink.onclick = function () { ShowHome(); }

function ShowHome() {
    let mainDiv = document.querySelector(".mainDiv");
    mainDiv.innerHTML = "";
    mainDiv.innerHTML = `
    <div class="bg container-fluid" id="prepravi">
        <blockquote class="blockquote">
            <h1 class="strokeme mb-0">There is a need for a comprehensive D&D Character Builder with all the needed components on display for easy accsess and use.</h1>
            <h1 class="strokeme mb-0">This system alows users to make an acount.</h1>
            <h1 class="strokeme mb-0">And alows you to make and see others character.</h1>
        </blockquote>
    </div>
    `;
}