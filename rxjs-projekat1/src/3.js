import { range, interval, Observable, from, of, Subject } from "rxjs";
import { filter, map, take, takeUntil, scan } from "rxjs/operators";


const sub$ = new Subject();
sub$
  .pipe(
    scan((acc, val) => {
      return acc + val; 
    })
  )
.subscribe(x => console.log("subscribed "+x));
sub$.next(["id1", "id2", "id3"]);
sub$.next(["id555", "id2", "id3", "id4"]);
sub$.next(["id1", "id2", "id3", "id4"]);
