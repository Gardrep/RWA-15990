import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as dataPointActions from '../../_actions/datapoint.actions';
import * as allReducers from '../../_reducers';
import { DataPoint } from 'src/app/_models/dataPoint';
import { State } from 'src/app/_reducers';
import { IDataPoint } from 'src/app/_models/IDatapoint';

@Component({
  selector: 'app-data-point',
  templateUrl: './data-point.component.html',
  styleUrls: ['./data-point.component.css']
})
export class DataPointComponent implements OnInit {

  dataPoints$: Observable<IDataPoint[]>;
  dataPointss$: DataPoint[];
  dataIDS$: Observable<string[] | number[]>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(dataPointActions.loadDataPoints({ dataPoints: [new DataPoint(10, new Date(), "tvoja mama")] }));
    this.dataPoints$ = this.store.select(allReducers.selectAllDataPoints);
    this.dataIDS$ = this.store.select(allReducers.selectDataPointIds);
    this.dataPointss$ = Array();
    this.dataPoints$.subscribe((dps) => {
      dps.map((dp) => {
        this.dataPointss$.push(dp);
      })
    })
  }

  nekafunkcija() {
    this.store.dispatch(dataPointActions.loadDataPoints({ dataPoints: [new DataPoint(0, new Date(), "tvoja mama3"), new DataPoint(1, new Date(), "tvoja mama4"), new DataPoint(2, new Date(), "tvoja mama5")] }))
    console.log(this.dataPoints$);
  }
}
