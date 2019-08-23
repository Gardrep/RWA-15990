import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as dataPointActions from '../../_actions/datapoint.actions';
import { DataPoint } from 'src/app/_models/dataPoint';
import { State } from 'src/app/_reducers';
import { Exercise } from 'src/app/_models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartDataSets } from 'chart.js';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-data-point',
  templateUrl: './data-point.component.html',
  styleUrls: ['./data-point.component.css']
})
export class DataPointComponent implements OnInit {
  public ownerForm: FormGroup;

  dataIDS$: Observable<string[] | number[]>;
  MyDataSetL$: ChartDataSets[] = [];
  MyDataSetS$: ChartDataSets[] = [];
  dpThis$: DataPoint;
  IsEdit: boolean = false;

  @Input()
  set dpThis(dp: DataPoint) {
    this.dpThis$ = dp;
    this.DPtoDS();
  }

  constructor(private store: Store<State>) { }

  DPtoDS() {
    if (typeof (this.dpThis$) != "undefined")
      if (typeof (this.dpThis$.exercises) != "undefined") {
        this.MyDataSetL$ = [];
        this.MyDataSetS$ = [];
        
        console.log(this.MyDataSetL$);
        console.log(this.MyDataSetS$);
        this.dpThis$.exercises.map((ex) => {
          this.DSpush(ex);
        })
        this.dpThis$.activities.map((ac) => {
          this.DSpush(ac);
        })
        console.log(this.MyDataSetS$);
        this.dpThis$.consumables.map((co) => {
          console.log(this.MyDataSetS$);
          this.DSpushC(co);
        })
        console.log(this.MyDataSetL$);
        console.log(this.MyDataSetS$);
      }
  }

  DSpush(obj) {
    let datePipe = new DatePipe("en-US");
    let star = parseInt(datePipe.transform(obj.startsOn, "H"), 10) - 2;
    if (star < 0) star = star + 24;
    let ends = parseInt(datePipe.transform(obj.endsOn, "H"), 10) - 2;
    if (ends < 0) ends = ends + 24;

    let dataLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 25; i++) {
      if (i >= star && i <= ends) {
        dataLine[i] = obj.effectiveness;
      }
    }
    this.MyDataSetL$.push({ data: dataLine, label: obj.type });
  }

  DSpushC(obj) {
    let datePipe = new DatePipe("en-US");
    let star = parseInt(datePipe.transform(obj.timeConsumed, "H"), 10) - 2;
    if (star < 0) star = star + 24;
    this.MyDataSetS$.push(
      {
        data: [
          { x: star, y: star },
        ],
        label: 'Series B',
        pointRadius: 10,
      },
    );
    console.log(this.MyDataSetS$);
  }

  ngOnInit() {
    this.dpThis$ = new DataPoint(-10, "Prazan", new Date(), -1, "empty");
    this.DPtoDS();

    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl(new Date()),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  Edit() {
    this.IsEdit = !this.IsEdit;
  }


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
