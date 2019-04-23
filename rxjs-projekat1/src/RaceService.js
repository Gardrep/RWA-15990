import { Observable, fromEvent } from 'rxjs';
import {Race} from "./Race.js";

export class RaceService{

    constructor()
    {
        this.AllRaces;
        this.GetAllRaces().subscribe(list=>this.AllRaces = list);
    }

    GetAllRaces(){
        return Observable.create(generator => {
            fetch("http://178.149.70.120:3000/races")
            .then(x=>x.json())
                .then(data=>{
                    generator.next(
                        data.map(race=>{
                        return new Race(race);
                        })
                    );
                });
        });
    }

    ShowRacesTable(){
        var mainDiv =document.querySelector(".mainDiv");
        mainDiv.innerHTML="";

        var search = document.createElement("input");
        search.type="text";
        search.id="myInput";
        search.placeholder="Search for names..";
        search.className="form-control";
        mainDiv.appendChild(search);

        const input = fromEvent(search, 'input');
        input.subscribe((typed) =>{
            var filter;
            filter = typed.target.value.toUpperCase(); 
            let list = this.AllRaces.filter(race=>{      
                    return race.name.toUpperCase().indexOf(filter)>=0
                });
            this.FillTable(body, list);
        });

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
        body.innerHTML = "";
        tabela.appendChild(body);

        this.FillTable(body, this.AllRaces);
    }

    FillTable(body, list){
        body.innerHTML = "";
        let item;
        list.forEach(rase=>{
            item = document.createElement("tr");
            body.appendChild(item);
            this.FillRaceRow(item,rase);
            item.onclick=function() {console.log(rase)};
            item.scope="row";
        });
    }

    FillRaceRow(row,race){
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
}