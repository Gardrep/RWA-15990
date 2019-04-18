import { range, interval, Observable } from "rxjs";
import { filter, map, take, takeUntil } from "rxjs/operators";

function execRange() {
  range(1, 100).pipe(
    filter(x => x % 2 === 0),
    map(x => x + 1)
  ).subscribe(x => console.log(x));
}

function execInterval() {
  interval(500).pipe(
    map(x => x * x),
    take(20)
  ).subscribe(x => console.log(x));
}

function execCreate() {
  const sub = Observable.create(generator => {
    setInterval(() => {
      generator.next(parseInt(Math.random() * 6));
    }, 500)
  }).subscribe(x => console.log(x));
  return sub;
}

function createUnsubscribeButton(subscription) {

  const button = document.createElement("button");
  document.body.appendChild(button);
  button.innerHTML = "Stop!";
  button.onclick = () => subscription.unsubscribe();

}


//execInterval();
const sub = execCreate();
createUnsubscribeButton(sub);