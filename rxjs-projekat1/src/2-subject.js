import { interval, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";


function execIntervalUntil(observable$) {
  interval(100).pipe(
    takeUntil(observable$)
  ).subscribe(x => console.log(x));
}

function stopIntevalWithDelay(observable$) {
  setTimeout(() => {
    observable$.next();
    observable$.complete();
  }, 2000);
}

function subscribeToSubject() {
  subject$.subscribe(x => console.log(`sub, ${x}`));

  subject$.next(1);

  subject$.next(2);
}

const subject$ = new Subject(); // Subject ~= Event emitter 
// Every Subject is an Observable and an Observer. You can subscribe to a Subject, and you can call next to feed values as well as error and complete.

subscribeToSubject();
execIntervalUntil(subject$);
stopIntevalWithDelay(subject$);
