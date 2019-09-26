import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const DBService = {

  baseUrl: "http://localhost:3002/",

  PostById(collection, model) {
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model)
    }
    return fetch(`${this.baseUrl}${collection}`, options)
      .then(response => response.json());
  },


  GetAll(collection) {
    return from(fetch(`${this.baseUrl}${collection}`)
      .then(response => response.json()))
      .pipe(switchMap(x => { return from(x); }));
  },


  GetById(collection, id) {
    if (!id) {
      return Observable.create(generator => { generator.next(""); generator.complete(); })
    }
    else {
      return Observable.create(generator => {
        fetch(`${this.baseUrl}${collection}/${id}`)
          .then(x => x.json())
          .then(data => {
            generator.next(data);
            generator.complete();
          });
      });
    }
  },

  async GetHTML(name) {
    return await fetch('./src/_services/' + name + '.html')
      .then(function (response) { return response.text(); })
      .then(function (res) { return res; });
  },

  async GetHomeTextHTML() {
    return await fetch('./src/HomeText.html')
      .then(function (response) { return response.text(); })
      .then(function (res) { return res; });
  },

  relativePath: './src/_components/',

  async GetCharactersHTML(name) {
    return await fetch(this.relativePath + "character/" + name + '.html')
      .then(function (response) { return response.text(); })
      .then(function (res) { return res; });
  },

  async GetClassesHTML(name) {
    return await fetch(this.relativePath + "class/" + name + '.html')
      .then(function (response) { return response.text(); })
      .then(function (res) { return res; });
  },

  async GetRacesHTML(name) {
    return await fetch(this.relativePath + "race/" + name + '.html')
      .then(function (response) { return response.text(); })
      .then(function (res) { return res; });
  },

  async GetSpellsHTML(name) {
    return await fetch(this.relativePath + "spell/" + name + '.html')
      .then(function (response) { return response.text(); })
      .then(function (res) { return res; });
  },

  async GetUsersHTML(name) {
    return await fetch(this.relativePath + "user/" + name + '.html')
      .then(function (response) { return response.text(); })
      .then(function (res) { return res; });
  }
}