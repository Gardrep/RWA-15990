import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav-dates',
  templateUrl: './side-nav-dates.component.html',
  styleUrls: ['./side-nav-dates.component.css']
})
export class SideNavDatesComponent implements OnInit {

  events: string[] = [];
  lastOpendDate: string[] = [];
  opened: boolean;

  
  constructor() { }

  ngOnInit() {
  }
}
