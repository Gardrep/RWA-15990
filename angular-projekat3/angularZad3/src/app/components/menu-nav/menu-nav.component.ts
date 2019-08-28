import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  TodaysDP(){
    
  }

  OpenMonthlyRadar(){
    this.router.navigate(['/monthlyRadar'],5 as NavigationExtras);
    console.log("fjosapjpo");
  }
}
