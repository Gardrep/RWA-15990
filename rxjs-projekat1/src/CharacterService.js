import { Global } from "./index.js";
import { Observable, fromEvent, zip} from 'rxjs';
import {Character} from "./Character.js";
import {ClassService} from "./ClassService.js";
import {RaceService} from "./RaceService.js";

export class CharacterService{

    constructor()
    {
        this.AllCharacters = this.GetAllCharacters();
        //this.GetAllCharacters().subscribe(list=>this.AllCharacters = list);
    }

    GetAllCharacters(){
        return Observable.create(generator => {
            fetch("http://178.149.70.120:3000/characters")
            .then(x=>x.json())
                .then(data=>{
                    generator.next(
                        data.map(character=>{
                        return new Character(character);
                        })
                    );
                });
        });
    }
    AddCharacter(mainDiv){
        Global.Crtaj(mainDiv);
        var inputdiv = document.createElement("div");
        inputdiv.className ="form-row align-items-center";
        mainDiv.appendChild(inputdiv);

        var btndiv = document.createElement("div");
        btndiv.className ="col--sm-1 my-1";
        inputdiv.appendChild(btndiv);

        var commitbtn = document.createElement("button");
        commitbtn.innerHTML = "Commit";
        commitbtn.className ="btn btn-primary";
        btndiv.appendChild(commitbtn);

        btndiv = document.createElement("div");
        btndiv.className ="col--sm-1 my-1";
        inputdiv.appendChild(btndiv);

        var discardbtn = document.createElement("button");
        discardbtn.innerHTML = "Discard/Build new";
        discardbtn.className ="btn btn-primary";
        btndiv.appendChild(discardbtn);

        fromEvent(commitbtn, 'click').subscribe(function() {
            //Dodaj u bazu
            console.log("DODAJ U BAZU");
        });

        fromEvent(discardbtn, 'click').subscribe(function() {
            Global.ShowBuild();
        });
    }

    ShowAddCharacter(mainDiv){
        Global.Crtaj(mainDiv);
        var inputdiv = document.createElement("div");
        inputdiv.className ="form-row align-items-center";
        mainDiv.appendChild(inputdiv);

        var btndiv = document.createElement("div");
        btndiv.className ="col--sm-1 my-1";
        inputdiv.appendChild(btndiv);

        var commitbtn = document.createElement("button");
        commitbtn.innerHTML = "Commit";
        commitbtn.className ="btn btn-primary";
        btndiv.appendChild(commitbtn);

        var serchdiv = document.createElement("div");
        serchdiv.className ="col-sm-4 my-1";
        inputdiv.appendChild(serchdiv);

        var search = document.createElement("input");
        search.type="text";
        search.id="myInput";
        search.placeholder="Enter name ...";
        search.className="form-control";
        serchdiv.appendChild(search);

        fromEvent(commitbtn, 'click').subscribe(function() {
            let name =document.getElementById('myInput').value
            console.log(name);
            Global.name = name;
            let ClassMngr = new ClassService();
            mainDiv.innerHTML=`
            <div class="container-fluid">
                <blockquote class="blockquote">
                    <p class="mb-0">Choose your class.</p>
                </blockquote>
            </div>
            `;
            Global.Crtaj(mainDiv);
            ClassMngr.ShowClassesTable(mainDiv, true);
        });
    }

    ShowCharactersTable(mainDiv){
        var inputdiv = document.createElement("div");
        inputdiv.className ="form-row align-items-center";
        mainDiv.appendChild(inputdiv);

        var serchdiv = document.createElement("div");
        serchdiv.className ="col-sm-3 my-1";
        inputdiv.appendChild(serchdiv);

        var search = document.createElement("input");
        search.type="text";
        search.id="myInput";
        search.placeholder="Search for names..";
        search.className="form-control";
        serchdiv.appendChild(search);
        
        const input$ = fromEvent(search, 'input');
        input$.subscribe((typed) =>{
            var filter;
            filter = typed.target.value.toUpperCase(); 
             this.AllCharacters.subscribe((list)=>{
                list = list.filter(character=>{        
                    return character.name.toUpperCase().indexOf(filter)>=0
                });
                this.FillTable(body, list);
            })
        });

        var tabela = document.createElement("table");
        tabela.className ="table table-striped table-hover";
        mainDiv.appendChild(tabela);

        var header = document.createElement("thead");
        tabela.appendChild(header);
        header.innerHTML=`
        <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Class</th>
        <th scope="col">Race</th>
        <th scope="col">Spells</th>
        </tr>
        `;
        var body = document.createElement("tbody");
        body.innerHTML = "";
        tabela.appendChild(body);

        this.FillTable(body);
    }

    FillTable(body, list){
        if(list)
        {
            this.MakeRows(body,  list)
        }
        else
        {
            this.AllCharacters.subscribe((list)=>{
                this.MakeRows(body,  list)
            });   
        }
    }

    MakeRows(body, list)
    {
        body.innerHTML = "";
        let item;
        list.forEach((character)=>{
            item = document.createElement("tr");
            body.appendChild(item);
            this.FillClassRow(item, character);
            item.scope="row";
        });
    }

    FillClassRow(row, character){
        let ClassMngr = new ClassService();
        let RaceMngr = new RaceService();

        zip(
            ClassMngr.GetClass(character.class),
            RaceMngr.GetRace(character.race)
        ).subscribe(([showclass, showrace])=>{
            row.innerHTML += `
            <td>${character.id}</td>
            <td>${character.name}</td>
            <td>${showclass.name}</td>
            <td>${showrace.name}</td>
            <td>${character.spells}</td>
            `}
        );
    }
}