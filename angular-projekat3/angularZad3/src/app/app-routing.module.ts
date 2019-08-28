import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import { SideNavDatesComponent } from './components/side-nav-dates/side-nav-dates.component';
import { MonthlyRadarComponent } from './components/monthly-radar/monthly-radar.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'radarChart', component: RadarChartComponent },
  { path: 'monthlyRadar', component: MonthlyRadarComponent },
  { path: 'sideNavDP', component: SideNavDatesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
