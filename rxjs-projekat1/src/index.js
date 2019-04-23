import { range, interval, Observable,Subject} from "rxjs";
import { filter, map, take, takeUntil } from "rxjs/operators";
import {SpellService} from "./SpellService.js";
import {ClassService} from "./ClassService.js";
import {RaceService} from "./RaceService.js";

//----RunOnStart----
ShowHome();
let ClassMngr = new ClassService();
let RaceMngr = new RaceService();
let SpellMngr = new SpellService();

function ChooseSpell() {mainDiv.innerHTML=""; SpellMngr.ShowSpellsTable(mainDiv, true);}
function ChooseRace() {mainDiv.innerHTML=""; RaceMngr.ShowRacesTable(mainDiv, true, ChooseSpell);}
function ChooseClass() {ClassMngr.ShowClassesTable(mainDiv, true, ChooseRace);}

let ClassesLink = document.querySelector("#ClassesLink");
ClassesLink.onclick = function(){ mainDiv.innerHTML=""; ClassMngr.ShowClassesTable(mainDiv, false);}
let RacesLink = document.querySelector("#RacesLink");
RacesLink.onclick = function(){ mainDiv.innerHTML=""; RaceMngr.ShowRacesTable(mainDiv, false);}
let SpellsLink = document.querySelector("#SpellsLink");
SpellsLink.onclick = function(){ mainDiv.innerHTML=""; SpellMngr.ShowSpellsTable(mainDiv, false);}

var mainDiv =document.querySelector(".mainDiv");
//----Home----

let HomeLink = document.querySelector("#HomeLink");
HomeLink.onclick = function(){ShowHome();}

function ShowHome(){
    let mainDiv =document.querySelector(".mainDiv");
    mainDiv.innerHTML="";
    mainDiv.innerHTML=`
    <div class="container-fluid">
        <blockquote class="blockquote">
            <p class="mb-0">There is a need for a comprehensive D&D Character Builder with all the needed components on display for easy accsess and integration.</p>
            <p class="mb-0">This system alows users to make an acount and save their characters on it.</p>
        </blockquote>
    </div>
    `;
}

//----Build----

let BuildLink = document.querySelector("#BuildLink");
BuildLink.onclick = function(){ShowBuild();}

function ShowBuild(){
    mainDiv.innerHTML="";
    mainDiv.innerHTML=`
    <div class="container-fluid">
        <blockquote class="blockquote">
            <p class="mb-0">Here you can choose characteristics for your character.</p>
            <p class="mb-0">First choose your class.</p>
        </blockquote>
    </div>
    `;
    var divTabela = document.createElement("div");
    mainDiv.appendChild(divTabela);
    
    ChooseClass();
}

//----Classes----


//----Races----


//----Spells----


//----------------------------------------------------------
/*function filterNames() {
    var input, filter, item, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    li = document.getElementsByTagName('tr');

    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("td")[1];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
    let glava=document.querySelector("thead tr");
    glava.style.display = "";
  }
  */

