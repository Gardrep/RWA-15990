import { zip} from 'rxjs';
import {ClassService} from "./ClassService.js";
import {RaceService} from "./RaceService.js";
import {SpellService} from "./SpellService.js";
import {CharacterService} from "./CharacterService.js";
import { UserService } from './UserService.js';

export const Global = {
    userID:"",
    name:"empty",
    clas:"",
    race:"",
    spells:"empty",
    Crtaj(mainDiv)
    {
        var tabela = document.createElement("table");
        tabela.className ="table table-striped table-hover";
        mainDiv.appendChild(tabela);

        var header = document.createElement("thead");
        tabela.appendChild(header);
        header.innerHTML=`
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
        row.scope="row";
        body.appendChild(row);

        let ClassMngr = new ClassService();
        let RaceMngr = new RaceService();

        zip(
            ClassMngr.GetClass(this.clas),
            RaceMngr.GetRace(this.race)
        ).subscribe(([showclass, showrace])=>{
            //console.log(showclass);
            //console.log(showrace);
            row.innerHTML += `
            <td>${this.name}</td>
            <td>${showclass.name}</td>
            <td>${showrace.name}</td>
            <td>${this.spells}</td>
            `}
        );
    },

    ShowBuild(){
        Global.name="empty";
        Global.clas="";
        Global.race="";
        Global.spells="empty";
        mainDiv.innerHTML=`
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

//----RunOnStart----
ShowHome();
let ClassMngr = new ClassService();
let RaceMngr = new RaceService();
let SpellMngr = new SpellService();
let CharacterMngr = new CharacterService();
let LoginMngr = new UserService();
/*
function CharacterList() {mainDiv.innerHTML=""; CharacterMngr.ShowCharactersTable(mainDiv);}
function ChooseSpell() {mainDiv.innerHTML=""; SpellMngr.ShowSpellsTable(mainDiv, true, CharacterList);}
function ChooseRace() {mainDiv.innerHTML=""; RaceMngr.ShowRacesTable(mainDiv, true, ChooseSpell);}
function ChooseClass() {ClassMngr.ShowClassesTable(mainDiv, true, ChooseRace);}
*/

let ClassesLink = document.querySelector("#ClassesLink");
ClassesLink.onclick = function(){ mainDiv.innerHTML=""; ClassMngr.ShowClassesTable(mainDiv, false);}
let RacesLink = document.querySelector("#RacesLink");
RacesLink.onclick = function(){ mainDiv.innerHTML=""; RaceMngr.ShowRacesTable(mainDiv, false);}
let SpellsLink = document.querySelector("#SpellsLink");
SpellsLink.onclick = function(){ mainDiv.innerHTML=""; SpellMngr.ShowSpellsTable(mainDiv, false);}
let CharacterListLink = document.querySelector("#CharacterListLink");
CharacterListLink.onclick = function(){ mainDiv.innerHTML=""; CharacterMngr.ShowCharactersTable(mainDiv);}
let LoginLink = document.querySelector("#LoginLink");
LoginLink.onclick = function(){ mainDiv.innerHTML=""; LoginMngr.ShowLogin(mainDiv);}

var mainDiv =document.querySelector(".mainDiv");
//----Home----

let HomeLink = document.querySelector("#HomeLink");
HomeLink.onclick = function(){ShowHome();}

function ShowHome(){
    let mainDiv =document.querySelector(".mainDiv");
    mainDiv.innerHTML="";
    mainDiv.innerHTML=`
    <div class="bg container-fluid" id="prepravi">
        <blockquote class="blockquote">
            <h1 class="strokeme mb-0">There is a need for a comprehensive D&D Character Builder with all the needed components on display for easy accsess and use.</font></h1>
            <h1 class="strokeme mb-0">This system alows users to make an acount and save their characters on it.</font></h1>
        </blockquote>
    </div>
    `;
}

//----Build----

let BuildLink = document.querySelector("#BuildLink");
BuildLink.onclick = function(){Global.ShowBuild();}
