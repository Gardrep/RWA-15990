import { range, interval, Observable,Subject} from "rxjs";
import { filter, map, take, takeUntil } from "rxjs/operators";


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



//----Home----

let HomeLink = document.querySelector("#HomeLink");
HomeLink.onclick = function(){ShowHome();}

function ShowHome(){
    let mainDiv =document.querySelector(".mainDiv");
    mainDiv.innerHTML="";

    mainDiv.innerHTML="Ovo je home";
}

//----Classes----

let ClassesLink = document.querySelector("#ClassesLink");
ClassesLink.onclick = function(){ShowClasses();}

function GetClasses(){
        return Observable.create(generator => {
            fetch("http://178.149.70.120:3000/classes")
            .then(x=>x.json())
                .then(data=>{generator.next(data);console.log(data);});
                });
}

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
    <td scope="col">Hit Dice</td>
    <td scope="col">Favored Stats</td>
    <td scope="col">Natural Proficiencis</td>
    </tr>
    `;
    var body = document.createElement("tbody");
    tabela.appendChild(body);

    var item;
    const subject$ = new Subject();
    GetClasses(subject$).subscribe(x =>{
                    x.forEach(g=>{
                        item = document.createElement("tr");
                        body.appendChild(item);
                        FillClassRow(item,g);
                        item.onclick=function() {console.log(g)};
                        item.scope="row"
                    })
            });
}

function FillClassRow(row,clas){
    let saving = "";
    clas.saving_throws.forEach(x=>{saving+=x.name+", "});

    let prof = "";
    clas.proficiencies.forEach(x=>{prof+=x.name+", "});
    row.innerHTML += `
        <td>${clas.id}</td>
        <td>${clas.name}</td>
        <td>${clas.hit_die}</td>
        <td>${saving}</td>
        <td>${prof}</td>
    `;
}

//----Races----

let RacesLink = document.querySelector("#RacesLink");
RacesLink.onclick = function(){ShowRaces();}

function GetRaces(){
    return Observable.create(generator => {
        fetch("http://178.149.70.120:3000/races")
        .then(x=>x.json())
            .then(data=>{generator.next(data);console.log(data);});
            });
}

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
    <td scope="col">Subrace</td>
    <td scope="col">Speed</td>
    <td scope="col">Size</td>
    <td scope="col">Ability Bonuses</td>
    <td scope="col">Traits</td>
    <td scope="col">Lenguages</td>
    </tr>
    `;
    var body = document.createElement("tbody");
    tabela.appendChild(body);

    var item;
    const subject$ = new Subject();
    GetRaces(subject$).subscribe(x =>{
                    x.forEach(g=>{
                        item = document.createElement("tr");
                        body.appendChild(item);
                        FillRaceRow(item,g);
                        item.onclick=function() {console.log(g)};
                        item.scope="row"
                    })
            });
}

function FillRaceRow(row,clas){
    let subraces = "";
    clas.subraces.forEach(x=>{subraces+=x.name+", "});
    let traits = "";
    clas.traits.forEach(x=>{traits+=x.name+", "});
    let abbon = "";
    clas.ability_bonuses.forEach(x=>{abbon+=x.name+":"+x.bonus+", "});
    let leng = "";
    clas.languages.forEach(x=>{leng+=x.name+", "});
    row.innerHTML += `
        <td>${clas.id}</td>
        <td>${clas.name}</td>
        <td>${subraces}</td>
        <td>${clas.speed}</td>
        <td>${clas.size}</td>
        <td>${abbon}</td>
        <td>${traits}</td>
        <td>${leng}</td>
    `;
}

//----Spells----

let SpellsLink = document.querySelector("#SpellsLink");
SpellsLink.onclick = function(){ShowSpells();}

function GetSpells(){
    return Observable.create(generator => {
        fetch("http://178.149.70.120:3000/spells")
        .then(x=>x.json())
            .then(data=>{generator.next(data);console.log(data);});
            });
}

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
    <td scope="col">Ritual</td>
    <td scope="col">Concentration</td>
    <td scope="col">Casting Time</td>
    <td scope="col">Classes</td>
    <td scope="col">Description</td>
    </tr>
    `;
    var body = document.createElement("tbody");
    tabela.appendChild(body);

    var item;
    const subject$ = new Subject();
    GetSpells(subject$).subscribe(x =>{
                    x.forEach(g=>{
                        item = document.createElement("tr");
                        body.appendChild(item);
                        FillSpellRow(item,g);
                        item.onclick=function() {console.log(g)};
                        item.scope="row"
                    })
            });
}

function FillSpellRow(row,clas){
    let cla = "";
    clas.classes.forEach(x=>{cla+=x.name+", "});
    row.innerHTML += `
        <td>${clas.id}</td>
        <td>${clas.name}</td>
        <td>${clas.level}</td>
        <td>${clas.range}</td>
        <td>${clas.ritual}</td>
        <td>${clas.concentration}</td>
        <td>${clas.casting_time}</td>
        <td>${cla}</td>
        <td>${clas.desc}</td>
    `;
}

//----------------------------------------------------------
function filterNames() {

    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    li = document.getElementsByTagName('tr');

    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("td")[1];
      txtValue = a.textContent || a.innerText;
      console.log(a);
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
    let glava=document.querySelector("thead tr").style.display = "";
    glava.style.display = "";

  }

