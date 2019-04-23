import { Observable, fromEvent } from 'rxjs';
import {Class} from "./Class.js";

export class ClassService{

    constructor()
    {
        this.AllClasses;
        this.GetAllClasses().subscribe(list=>this.AllClasses = list);
    }

    GetAllClasses(){
        return Observable.create(generator => {
            fetch("http://178.149.70.120:3000/classes")
            .then(x=>x.json())
                .then(data=>{
                    generator.next(
                        data.map(clas=>{
                        return new Class(clas);
                        })
                    );
                });
        });
    }

    ShowClassesTable(){
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
            let list = this.AllClasses.filter(clas=>{        
                    return clas.name.toUpperCase().indexOf(filter)>=0
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
        body.innerHTML = "";
        tabela.appendChild(body);

        this.FillTable(body, this.AllClasses);
    }

    FillTable(body, list){
        body.innerHTML = "";
        let item;
        list.forEach((clas,index)=>{
            item = document.createElement("tr");
            body.appendChild(item);
            this.FillClassRow(item,clas,index+1);
            console.log(index);
            item.scope="row";
        });

    }

    FillClassRow(row,clas,index){
        row.innerHTML += `
            <td>${clas.id}</td>
            <td>${clas.name}</td>
            <td>
                <div id="accordion">
                    <div class="card">
                    <div id="heading${index}">
                        <button class="btn btn-light btn-sm" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                            hide/reveal
                        </button>
                    </div>
                
                    <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#accordion">
                        <div class="card-body">
                        ${clas.description}
                        </div>
                    </div>
                    </div>
                </div>
            </td>
            <td>${clas.hit_die}</td>
            <td>
            <div id="accordion">
                <div class="card">
                    <div id="heading${index}">
                        <button class="btn btn-light btn-sm" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                            hide/reveal
                        </button>
                    </div>
                
                    <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#accordion">
                        <div class="card-body">
                        ${clas.proficiency_choices}
                        </div>
                    </div>
                </div>
            </div>
            </td>
            <td>
            <div id="accordion">
                <div class="card">
                    <div id="heading${index}">
                        <button class="btn btn-light btn-sm" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                            hide/reveal
                        </button>
                    </div>
                
                    <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#accordion">
                        <div class="card-body">
                        ${clas.proficiencies}
                        </div>
                    </div>
                </div>
            </div>
            </td>
            <td>${clas.saving_throws}</td>
            <td>${clas.starting_equipment}</td>
            <td>${clas.class_level}</td>
            <td>${clas.subclasses}</td>
            <td>${clas.spellcasting}</td>
        `;
    }
}