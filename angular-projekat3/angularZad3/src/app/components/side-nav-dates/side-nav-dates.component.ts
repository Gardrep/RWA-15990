import { Component, OnInit } from '@angular/core';
import { DataPoint } from 'src/app/_models/dataPoint';

@Component({
  selector: 'app-side-nav-dates',
  templateUrl: './side-nav-dates.component.html',
  styleUrls: ['./side-nav-dates.component.css']
})
export class SideNavDatesComponent implements OnInit {

  opened: boolean;
  events: string[] = [];
  lastOpendDataPoint: string[] = [];

  dataPointList: DataPoint[] = [];

  
  constructor() { }

  ngOnInit() {
  }

  nekaFunkcija(){
    let pomDP = new DataPoint(this.getRandomArbitrary(11,5000),new Date(),'markoop')
    pomDP.happy = this.getRandomArbitrary(1,5);
    this.dataPointList.push(pomDP);
  }

  getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min);
  }
}
