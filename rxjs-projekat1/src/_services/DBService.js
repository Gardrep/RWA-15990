import { Observable } from 'rxjs';

export class DBService {

  constructor() {
    this.baseUrl = "http://localhost:3000/";
  }
  /*
    Set(where, data) {
      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
      return fetch(`${this.baseUrl}${where}`, options)
        .then((response) => response.json)
    }
    */

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
  }

  GetAll(table) {
    return Observable.create(generator => {
      fetch(`${this.baseUrl}${table}`)
        .then(x => x.json())
        .then(data => {
          generator.next(data);
          generator.complete();
        });
    });
  }

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
  }

  GetSome(table, some) {
    if (!some) {
      return Observable.create(generator => { generator.next(); generator.complete(); })
    }
    else {
      return Observable.create(generator => {
        let list = [];
        some.forEach((id) => {
          fetch(`${this.baseUrl}${table}/${id}`)
            .then(x => x.json())
            .then(data => { list.push(data) });
        });
        generator.next(list);
        generator.complete();
      });
    }
  }
}