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

function GetClasses(){
        return Observable.create(generator => {
            fetch("http://178.149.70.120:3000/classes")
            .then(x=>x.json())
                .then(data=>{generator.next(data);console.log(data);});
                });
}

function ShowClasses(){
    var tabela = document.createElement("table");
    tabela.className ="table table-striped table-hover";
    document.body.appendChild(tabela);

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
                        FillRow(item,g);
                        item.onclick=function() {console.log(g)};
                        item.scope="row"
                    })
            });
}

function FillRow(row,clas){
    let saving = "";
    clas.saving_throws.forEach(x=>{saving+=x.name+","});

    let prof = "";
    clas.proficiencies.forEach(x=>{prof+=x.name+","});
    row.innerHTML += `
        <td>${clas.id}</td>
        <td>${clas.name}</td>
        <td>${clas.hit_die}</td>
        <td>${saving}</td>
        <td>${prof}</td>
    `;
}



ShowClasses();


/*
console.log('kraj');
var dugme = document.createElement("button");
dugme.innerHTML ="hfdisa";
document.body.appendChild(dugme);

document.body.innerHTML=`
<ul>
  <li><a class="active" href="#home">Home</a></li>
  <li><a href="#news">News</a></li>
  <li><a href="#contact">Contact</a></li>
</ul>
`;
*/
