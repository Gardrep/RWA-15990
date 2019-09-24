import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataPoint } from 'src/app/_models/dataPoint';
import { State } from 'src/app/_reducers';
import { FormGroup } from '@angular/forms';
import { ChartDataSets } from 'chart.js';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-data-point',
  templateUrl: './data-point.component.html',
  styleUrls: ['./data-point.component.css']
})
export class DataPointComponent implements OnInit {
  public dpForm: FormGroup;

  dataIDS$: Observable<string[] | number[]>;
  MyDataSetL$: ChartDataSets[] = [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Empty' }];
  MyDataSetS$: ChartDataSets[] = [];
  dpThis$: DataPoint;
  IsEdit$: boolean = false;

  @Input()
  set dpThis(dp: DataPoint) {
    this.dpThis$ = dp;
    this.DPtoDS();
  }

  @Input()
  set IsEdit(obj) {
    this.IsEdit$ = obj;
  }

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.dpThis$ = new DataPoint(-10, "Prazan", new Date(), -1, "empty");
    this.DPtoDS();
  }

  DPtoDS() {
    if (typeof (this.dpThis$) != "undefined")
      if (typeof (this.dpThis$.exercises) != "undefined") {
        this.MyDataSetL$ = [];
        this.MyDataSetS$ = [];

        this.dpThis$.exercises.map((ex) => {
          this.DSpush(ex);
        })

        this.dpThis$.activities.map((ac) => {
          this.DSpush(ac);
        })

        this.dpThis$.consumables.map((co) => {
          this.DSpushComponents(co);
        })
      }
  }

  DSpush(obj) {
    let datePipe = new DatePipe("en-US");
    let star = parseInt(datePipe.transform(obj.startsOn, "H"), 10);
    if (star < 0) star = star + 24;
    let ends = parseInt(datePipe.transform(obj.endsOn, "H"), 10);
    if (ends < 0) ends = ends + 24;

    let dataLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 24; i++) {
      if (i >= star && i <= ends) {
        dataLine[i] = obj.effectiveness;
      }
    }
    this.MyDataSetL$.push({ data: dataLine, label: obj.type });
  }

  DSpushComponents(obj) {
    let datePipe = new DatePipe("en-US");
    let star = parseInt(datePipe.transform(obj.timeConsumed, "H"), 10);
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
  }
}
