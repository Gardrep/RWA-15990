import { Component, OnInit } from '@angular/core';
import { DataPoint } from 'src/app/_models/dataPoint';
//import { DataPointService } from '../../_services/data-point.service';
import { State } from 'src/app/_reducers';
import { Store } from '@ngrx/store';
import * as dataPointActions from '../../_actions/datapoint.actions';
import { IDataPoint } from 'src/app/_models/IDatapoint';
import { Observable } from 'rxjs';
import * as allReducers from '../../_reducers';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'side-nav-dates',
  templateUrl: './side-nav-dates.component.html',
  styleUrls: ['./side-nav-dates.component.css']
})
export class SideNavDatesComponent implements OnInit {

  opened: boolean;
  events: string[] = [];
  lastOpendDataPoint: string[] = [];


  dataPoints$: Observable<IDataPoint[]>;
  dataPointList: DataPoint[] = [];
  selectedDP: DataPoint;
  IsEdit: boolean = false;


  constructor(private store: Store<State>) { }

  ngOnInit() {
    /*let DBMngr : DataPointService;
      let list: DataPoint[];
      DBMngr.getDataPoints().subscribe((datalist)=>{
        list = datalist.map((data) => {
          return new DataPoint(data.ID, data.name, data.date, data.happy, data.dairy);
        })
        this.store.dispatch(dataPointActions.loadDataPointsSuccsess({ dataPoints: list }));
      });
      */
      this.store.dispatch(dataPointActions.loadDataPoints());

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

  showDP(dp:DataPoint){
    let datePipe = new DatePipe("en-US");
    return datePipe.transform(dp.date, "dd.MM.yyyy") + "\nHappy: " + dp.happy+ "\n" + dp.name;
  }

  selectDP(dp: DataPoint){
    console.log(dp);
    this.selectedDP = dp;
  }

  AddSaveDP() {
    /*let pomdp: DataPoint = new DataPoint(700, "Bas Lep Dan", new Date(), 5, "empty");
    let pomexer = new Exercise();
    pomexer.name = "kalistenika na keju";
    pomexer.description = "neki opis";
    pomexer.effectiveness = 50;
    pomexer.ifInjury = false;
    pomexer.startsOn = new Date();
    pomexer.endsOn = new Date();
    pomdp.exercises.push(pomexer);
    this.store.dispatch(dataPointActions.addDataPoint({ dataPoint: pomdp }));*/
  }

  Edit() {
    this.IsEdit = !this.IsEdit;
  }
}