import { Injectable } from '@angular/core';
import { DataPoint } from '../_models'
import { HttpClient, HttpHeaders } from '@angular/common/http';


const config = "http://localhost:3003/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataPointService {

  constructor(private http: HttpClient) { }

  getDataPoints() {
    return this.http.get<DataPoint[]>(`${config}dataPoints`);
  }

  public getDataPointById(id: string = '') {
    return this.http.get<DataPoint>(`${config}dataPoints/?id=${id}`);
  }

  public setDataPoint(id, model) {
    return this.http.patch<DataPoint>(`${config}dataPoints`, model, httpOptions).toPromise();

    /*let options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model)
    }
    return fetch(`${config}dataPoints/`+id, options)
      .then((response) => response.json)
  }*/
  }
}