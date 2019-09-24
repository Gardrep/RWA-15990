import { Observable } from 'rxjs';

export const DBService = {

  baseUrl: "http://localhost:3002/",

  PostById(where, model) {
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model)
    }
    return fetch(`${this.baseUrl}${where}`, options)
      .then(response => response.json());
  },

  GetAll(table) {
    return Observable.create(generator => {
      fetch(`${this.baseUrl}${table}`)
        .then(x => x.json())
        .then(data => {
          generator.next(data);
          generator.complete();
        });
    });
  },

  Get(table, id) {
    if (!id) {
      return Observable.create(generator => { generator.next(""); generator.complete(); })
    }
    else {
      return Observable.create(generator => {
        fetch(`${this.baseUrl}${table}/${id}`)
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
      .then(function (response) {
        return response.text();
      })
      .then(function (res) {
        return res;
      });
  },

  relativePath: './src/_components/',

  async GetCharactersHTML(name) {
    return await fetch(this.relativePath+ "character/" + name + '.html')
      .then(function (response) {
        return response.text();
      })
      .then(function (res) {
        return res;
      });
  },

  async GetClassesHTML(name) {
    return await fetch(this.relativePath+ "class/" + name + '.html')
      .then(function (response) {
        return response.text();
      })
      .then(function (res) {
        return res;
      });
  },

  async GetRacesHTML(name) {
    return await fetch(this.relativePath+ "race/" + name + '.html')
      .then(function (response) {
        return response.text();
      })
      .then(function (res) {
        return res;
      });
  },

  async GetSpellsHTML(name) {
    return await fetch(this.relativePath+ "spell/" + name + '.html')
      .then(function (response) {
        return response.text();
      })
      .then(function (res) {
        return res;
      });
  },

  async GetUsersHTML(name) {
    return await fetch(this.relativePath+ "user/" + name + '.html')
      .then(function (response) {
        return response.text();
      })
      .then(function (res) {
        return res;
      });
  },


}