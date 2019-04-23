import { range, interval, Observable,Subject} from "rxjs";
import { filter, map, take, takeUntil } from "rxjs/operators";
import {SpellService} from "./SpellService.js";
import {ClassService} from "./ClassService.js";
import {RaceService} from "./RaceService.js";


function getRandomNumber(callback) {
    const number = parseInt(Math.random() * 10);
    setTimeout(() => callback(number), 3000);
}

async function getRandomNumberAsync() {
    return new Promise((resolve, reject) => {
        const number = parseInt(Math.random() * 5);
        setTimeout(() => number < 5 ?
            resolve(number) :
            reject("Number too high")
            , 500);
    });
}

// getRandomNumber((broj) => console.log(`iz async fje, broj=${broj}`));
// setTimeout(() => console.log("evo me"), 2000);

getRandomNumberAsync()
    .then(number => {
        if (number > 2) {
            console.log(`Jos jedan krug..., trenutni broj je ${number}`);
            return getRandomNumberAsync();
        } else {
            return number;
        }
    })
    .then(broj => console.log(`broj je ${broj}`))
    .catch(reason => console.log(reason));


//----RunOnStart----
ShowHome();
let ClassMngr = new ClassService();
let RaceMngr = new RaceService();
let SpellMngr = new SpellService();

let ClassesLink = document.querySelector("#ClassesLink");
ClassesLink.onclick = function(){ClassMngr.ShowClassesTable();}
let RacesLink = document.querySelector("#RacesLink");
RacesLink.onclick = function(){RaceMngr.ShowRacesTable();}
let SpellsLink = document.querySelector("#SpellsLink");
SpellsLink.onclick = function(){SpellMngr.ShowSpellsTable();}

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
    let mainDiv =document.querySelector(".mainDiv");
    mainDiv.innerHTML="";
    mainDiv.innerHTML=`
    <div class="container-fluid">
        <blockquote class="blockquote">
            <p class="mb-0">Here you can choose characteristics for your character.</p>
        </blockquote>
    </div>
    `;
}

//----Classes----


//----Races----


//----Spells----


//----------------------------------------------------------
function filterNames() {
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

