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

