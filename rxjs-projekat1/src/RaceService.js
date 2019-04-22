import { range, interval, Observable,Subject} from "rxjs";
import { filter, map, take, takeUntil,reduce } from "rxjs/operators";
import {Race} from "./Race.js";

export class RaceService{

constructor()
{}

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
}