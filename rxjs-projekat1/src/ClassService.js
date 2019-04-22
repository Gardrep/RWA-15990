import { range, interval, Observable,Subject} from "rxjs";
import { filter, map, take, takeUntil,reduce } from "rxjs/operators";
import {Class} from "./Class.js";

export class ClassService{

constructor()
{}

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
}