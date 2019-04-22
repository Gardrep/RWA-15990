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
let SpellMngr = new SpellService();
let ClassMngr = new ClassService();
let RaceMngr = new RaceService();
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

let ClassesLink = document.querySelector("#ClassesLink");
ClassesLink.onclick = function(){ShowClasses();}

function ShowClasses(){
    let mainDiv =document.querySelector(".mainDiv");
    mainDiv.innerHTML="";

    var search = document.createElement("input");
    search.type="text";
    search.onkeyup=function(){filterNames()};
    search.id="myInput";
    search.placeholder="Search for names..";
    search.className="form-control";
    mainDiv.appendChild(search);

    var tabela = document.createElement("table");
    tabela.className ="table table-striped table-hover";
    mainDiv.appendChild(tabela);

    var header = document.createElement("thead");
    tabela.appendChild(header);
    header.innerHTML=`
    <tr>
    <td scope="col">ID</td>
    <td scope="col">Class Name</td>
    <td scope="col">Description</td>
    <td scope="col">Hit Die</td>
    <td scope="col">Proficiency Choices</td>
    <td scope="col">Proficiencies</td>
    <td scope="col">Saving Throws</td>
    <td scope="col">Starting Equipment</td>
    <td scope="col">Class Level</td>
    <td scope="col">Subclasses</td>
    <td scope="col">Spellcasting</td>
    </tr>
    `;
    var body = document.createElement("tbody");
    tabela.appendChild(body);

    var item;
    ClassMngr.GetAllClasses().subscribe(allClasses=>{
        allClasses.forEach(clas=>{
            item = document.createElement("tr");
            body.appendChild(item);
            FillClassRow(item,clas);
            item.onclick=function() {console.log(clas)};
            item.scope="row"
        })
    });
}

function FillClassRow(row,clas){
    row.innerHTML += `
        <td>${clas.id}</td>
        <td>${clas.name}</td>
        <td>${clas.description}</td>
        <td>${clas.hit_die}</td>
        <td>${clas.proficiency_choices}</td>
        <td>${clas.proficiencies}</td>
        <td>${clas.saving_throws}</td>
        <td>${clas.starting_equipment}</td>
        <td>${clas.class_level}</td>
        <td>${clas.subclasses}</td>
        <td>${clas.spellcasting}</td>
    `;
}

//----Races----

let RacesLink = document.querySelector("#RacesLink");
RacesLink.onclick = function(){ShowRaces();}

function ShowRaces(){
    let mainDiv =document.querySelector(".mainDiv");
    mainDiv.innerHTML="";

    var search = document.createElement("input");
    search.type="text";
    search.onkeyup=function(){filterNames()};
    search.id="myInput";
    search.placeholder="Search for names..";
    search.className="form-control";
    mainDiv.appendChild(search);

    var tabela = document.createElement("table");
    tabela.className ="table table-striped table-hover";
    mainDiv.appendChild(tabela);

    var header = document.createElement("thead");
    tabela.appendChild(header);
    header.innerHTML=`
    <tr>
    <td scope="col">ID</td>
    <td scope="col">Race Name</td>
    <td scope="col">Speed</td>
    <td scope="col">Ability Bonuses</td>
    <td scope="col">Size</td>
    <td scope="col">Starting Proficiencies</td>
    <td scope="col">Languages</td>
    <td scope="col">Traits</td>
    <td scope="col">Subraces</td>
    </tr>
    `;
    var body = document.createElement("tbody");
    tabela.appendChild(body);

    var item;
    RaceMngr.GetAllRaces().subscribe(allRaces=>{
        allRaces.forEach(race=>{
            item = document.createElement("tr");
            body.appendChild(item);
            FillRaceRow(item,race);
            item.onclick=function() {console.log(race)};
            item.scope="row"
        })
    });
}

function FillRaceRow(row,race){
    row.innerHTML += `
        <td>${race.id}</td>
        <td>${race.name}</td>
        <td>${race.speed}</td>
        <td>${race.ability_bonuses}</td>
        <td>${race.size}</td>
        <td>${race.starting_proficiencies}</td>
        <td>${race.languages}</td>
        <td>${race.traits}</td>
        <td>${race.subraces}</td>
    `;
}

//----Spells----

let SpellsLink = document.querySelector("#SpellsLink");
SpellsLink.onclick = function(){ShowSpells();}
/*
function GetSpells(){
    return Observable.create(generator => {
        fetch("http://178.149.70.120:3000/spells")
        .then(x=>x.json())
            .then(data=>{generator.next(data);console.log(data);});
            });
}
*/

function ShowSpells(){
    let mainDiv =document.querySelector(".mainDiv");
    mainDiv.innerHTML="";

    var search = document.createElement("input");
    search.type="text";
    search.onkeyup=function(){filterNames()};
    search.id="myInput";
    search.placeholder="Search for names..";
    search.className="form-control";
    mainDiv.appendChild(search);

    var tabela = document.createElement("table");
    tabela.className ="table table-striped table-hover";
    mainDiv.appendChild(tabela);

    var header = document.createElement("thead");
    tabela.appendChild(header);
    header.innerHTML=`
    <tr>
    <td scope="col">ID</td>
    <td scope="col">Spell Name</td>
    <td scope="col">Level</td>
    <td scope="col">Range</td>
    <td scope="col">Components</td>
    <td scope="col">Ritual</td>
    <td scope="col">Duration</td>
    <td scope="col">Concentration</td>
    <td scope="col">Casting_time</td>
    <td scope="col">School</td>
    <td scope="col">Classes</td>
    <td scope="col">Subclasses</td>
    <td scope="col">Description</td>
    </tr>
    `;
    var body = document.createElement("tbody");
    tabela.appendChild(body);

    var item;

    SpellMngr.GetAllSpells().subscribe(allSpels=>{
        allSpels.forEach(spel=>{
            item = document.createElement("tr");
            body.appendChild(item);
            FillSpellRow(item,spel);
            item.onclick=function() {console.log(spel)};
            item.scope="row"
        })
});
}

function FillSpellRow(row,spel){
    row.innerHTML += `
        <td>${spel.id}</td>
        <td>${spel.name}</td>
        <td>${spel.level}</td>
        <td>${spel.range}</td>
        <td>${spel.components}</td>
        <td>${spel.ritual}</td>
        <td>${spel.duration}</td>
        <td>${spel.concentration}</td>
        <td>${spel.casting_time}</td>
        <td>${spel.school}</td>
        <td>${spel.classes}</td>
        <td>${spel.subclasses}</td>
        <td>${spel.desc}</td>
    `;
}

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

