import { Observable, fromEvent } from 'rxjs';
import {Spell} from "./Spell.js";

export class SpellService{

    constructor()
    {
        this.AllSpells;
        this.GetAllSpells().subscribe(list=>this.AllSpells = list);
    }

    GetAllSpells(){
        return Observable.create(generator => {
            fetch("http://178.149.70.120:3000/spells")
            .then(x=>x.json())
                .then(data=>{
                    generator.next(
                        data.map(spell=>{
                        return new Spell(spell);
                        })
                    );
                });
        });
    }

    ShowSpellsTable(){
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
            let list = this.AllSpells.filter(spell=>{        
                    return spell.name.toUpperCase().indexOf(filter)>=0
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
        <td scope="col">Description</td>
        </tr>
        `;
        var body = document.createElement("tbody");
        body.innerHTML = "";
        tabela.appendChild(body);

        this.FillTable(body, this.AllSpells);
    }

    FillTable(body, list){
        body.innerHTML = "";
        let item;
        list.forEach((clas,index)=>{
            item = document.createElement("tr");
            body.appendChild(item);
            this.FillSpellRow(item,clas,index);
            item.onclick=function() {console.log(clas)};
            item.scope="row";
        });
    }

    FillSpellRow(row,spel,index){
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
            <td>
            <div id="accordion">
                <div class="card">
                    <div id="heading${index}">
                        <a class="btn btn-light btn-sm" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                            hide/reveal
                        </a>
                    </div>
                
                    <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#accordion">
                        <div class="card-body">
                        ${spel.desc}
                        </div>
                    </div>
                </div>
            </div>
            </td>
        `;
    }
}