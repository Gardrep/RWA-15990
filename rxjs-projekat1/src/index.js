
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

async function loguj() {
    const broj = await getRandomNumberAsync();
    console.log(`iz fje ${broj}`);
}

loguj();

console.log('kraj');
var dugme = document.createElement("button");
document.body.appendChild(dugme);
document.body.innerHTML=`
<ul>
  <li><a class="active" href="#home">Home</a></li>
  <li><a href="#news">News</a></li>
  <li><a href="#contact">Contact</a></li>
</ul>
`;
