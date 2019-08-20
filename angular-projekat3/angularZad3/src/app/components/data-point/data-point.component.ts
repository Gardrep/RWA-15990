import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as dataPointActions from '../../_actions/datapoint.actions';
import { DataPoint } from 'src/app/_models/dataPoint';
import { State } from 'src/app/_reducers';
import { Exercise } from 'src/app/_models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-data-point',
  templateUrl: './data-point.component.html',
  styleUrls: ['./data-point.component.css']
})
export class DataPointComponent implements OnInit {
  public ownerForm: FormGroup;

  dataIDS$: Observable<string[] | number[]>;
  MyDataSet$: ChartDataSets[] =[];
  dpThis$: DataPoint;

  @Input()
  set dpThis(dp: DataPoint) {
    this.dpThis$ = dp;
    if (typeof(dp) != "undefined")
    if (typeof(this.dpThis$.exercises) != "undefined") {
      this.dpThis$.exercises.map((ex) => {
        let dataLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.MyDataSet$.push({ data: dataLine, label: ex.type });
      })
    }
  }


  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.dpThis$ = new DataPoint(-10, "Prazan", new Date(), -1, "empty");
    this.dpThis$.exercises.map((ex) => {
      let dataLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.MyDataSet$.push({ data: dataLine, label: ex.type });
    })

    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl(new Date()),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  /*nekafunkcija() {
    this.store.dispatch(dataPointActions.loadDataPoints({
      dataPoints: [
        new DataPoint(50, "Ljep Dan", new Date(), 5, "empty"),
        new DataPoint(41, "Odlicno se provodim", new Date(), 7, "eyyyyy"),
        new DataPoint(22, "Onaj jedan dan", new Date(), 8, "to")
      ]
    }))
  }*/


  AddSaveDP() {
    let pomdp: DataPoint = new DataPoint(700, "Bas Lep Dan", new Date(), 5, "empty");
    let pomexer = new Exercise();
    pomexer.name = "kalistenika na keju";
    pomexer.description = "neki opis";
    pomexer.effectiveness = 50;
    pomexer.ifInjury = false;
    pomexer.startsOn = new Date();
    pomexer.endsOn = new Date();
    pomdp.exercises.push(pomexer);
    this.store.dispatch(dataPointActions.addDataPoint({ dataPoint: pomdp }));
  }


  public hasError = (controlName: string, errorName: string) => {
    return this.ownerForm.controls[controlName].hasError(errorName);
  }

}
