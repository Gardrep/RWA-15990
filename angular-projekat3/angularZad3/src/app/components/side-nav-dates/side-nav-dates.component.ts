import { Component, OnInit } from '@angular/core';
import { DataPoint } from 'src/app/_models/dataPoint';
import * as DBMngr from '../../_services/DBService';
import { State } from 'src/app/_reducers';
import { Store } from '@ngrx/store';
import * as dataPointActions from '../../_actions/datapoint.actions';
import { IDataPoint } from 'src/app/_models/IDatapoint';
import { Observable } from 'rxjs';
import * as allReducers from '../../_reducers';

@Component({
  selector: 'app-side-nav-dates',
  templateUrl: './side-nav-dates.component.html',
  styleUrls: ['./side-nav-dates.component.css']
})
export class SideNavDatesComponent implements OnInit {

  opened: boolean;
  events: string[] = [];
  lastOpendDataPoint: string[] = [];


  dataPoints$: Observable<IDataPoint[]>;
  dataPointList: DataPoint[] = [];


  constructor(private store: Store<State>) { }

  ngOnInit() {
    DBMngr.getDataPoints().then((datalist) => {
      let list: DataPoint[];
      list = datalist.map((data) => {
        return new DataPoint(data.ID, data.name, data.date, data.happy, data.dairy);
      })
      this.store.dispatch(dataPointActions.loadDataPoints({ dataPoints: list }));
    });

    this.dataPoints$ = this.store.select(allReducers.selectAllDataPoints);
    this.dataPointList = Array();
    this.dataPoints$.subscribe((dps) => {
      this.dataPointList = Array();
      dps.map((dp) => {
        this.dataPointList.push(dp);
      })
    })
  }

  nekaFunkcija() {
    let pomDP = new DataPoint(this.getRandomArbitrary(11, 5000), 'Isprobavanje funkcije', new Date(), 0, 'empty');
    pomDP.happy = this.getRandomArbitrary(1, 5);
    this.dataPointList.push(pomDP);
  }

  getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min);
  }
}
