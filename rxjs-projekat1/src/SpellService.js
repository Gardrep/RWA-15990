import { range, interval, Observable,Subject} from "rxjs";
import { filter, map, take, takeUntil,reduce } from "rxjs/operators";
import {Spell} from "./Spell.js";

export class SpellService{

constructor()
{}

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
}