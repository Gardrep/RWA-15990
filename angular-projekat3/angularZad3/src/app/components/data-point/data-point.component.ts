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
  MyDataSet$: ChartDataSets[] =[];
  dpThis$: DataPoint;
  IsEdit: boolean = false;

  @Input()
  set dpThis(dp: DataPoint) {
    this.dpThis$ = dp;
    if (typeof(dp) != "undefined")
    if (typeof(this.dpThis$.exercises) != "undefined") {
      this.MyDataSet$=[];
      this.dpThis$.exercises.map((ex) => {

        let datePipe = new DatePipe("en-US");
        //let star = ex.startsOn.getHours();
        //let ends = ex.endsOn.getHours();
        let star = parseInt(datePipe.transform(ex.startsOn, "H"),10)-2;
        if(star<0)star=star+24;
        let ends = parseInt(datePipe.transform(ex.endsOn, "H"),10)-2;
        console.log(ends);
        if(ends<0)ends=ends+24;
        /*
        console.log(ex.endsOn);
        console.log(datePipe.transform(ex.endsOn, "H"));
        console.log(parseInt(datePipe.transform(ex.endsOn, "H"),10)-2);*/
        console.log(ends);

        let dataLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for(let i=0; i <25 ; i++)
        {
          /*console.log(i);
          if(i<10){
            console.log(datePipe.transform("2019-06-23T0"+i+":40:57.034Z", "H"));
          }else{
            console.log(datePipe.transform("2019-06-23T"+i+":40:57.034Z", "H"));
          }*/
          if(i >= star && i <= ends){
            dataLine[i]=ex.effectiveness;
          }
        }
        this.MyDataSet$.push({ data: dataLine, label: ex.type });
      })
    }
  }


  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.dpThis$ = new DataPoint(-10, "Prazan", new Date(), -1, "empty");
    this.dpThis$.exercises.map((ex) => {
      let dataLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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

  Edit(){
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
