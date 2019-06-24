import { Component, OnInit, Input } from '@angular/core';
import { Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import * as dataPointActions from '../../_actions/datapoint.actions';
import { DataPoint } from 'src/app/_models/dataPoint';
import { State } from 'src/app/_reducers';

@Component({
  selector: 'app-data-point',
  templateUrl: './data-point.component.html',
  styleUrls: ['./data-point.component.css']
})
export class DataPointComponent implements OnInit {
  
  dataIDS$: Observable<string[] | number[]>;

  @Input()
  dpThis$: DataPoint;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.dpThis$ =new DataPoint(-10, "Prazan", new Date(), -1, "empty")
  }

  nekafunkcija() {
    this.store.dispatch(dataPointActions.loadDataPoints({
      dataPoints: [
        new DataPoint(50, "Bas Lep Dan", new Date(), 5, "empty"),
        new DataPoint(41, "Odlicno se provodim", new Date(), 7, "eyyyyy"),
        new DataPoint(22, "Onaj jedan dan", new Date(), 8, "to")
      ]
    }))
  }

  AddSaveDP(){
    this.store.dispatch(dataPointActions.addDataPoint({dataPoint: new DataPoint(700, "Bas Lep Dan", new Date(), 5, "empty")}));
  }
}
