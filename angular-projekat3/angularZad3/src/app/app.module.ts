import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { SideNavDatesComponent } from './components/side-nav-dates/side-nav-dates.component';
import { DataPointComponent } from './components/data-point/data-point.component';

import { LineChartComponent } from './components/line-chart/line-chart.component';
import { ScatterChartComponent } from './components/scatter-chart/scatter-chart.component';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import { MonthlyRadarComponent } from './components/monthly-radar/monthly-radar.component';

import { EditDataPointComponent } from './components/edit-data-point/edit-data-point.component';
import { EditExerciseComponent } from './components/edit-exercise/edit-exercise.component';
import { EditActivityComponent } from './components/edit-activity/edit-activity.component';
import { EditConsumableComponent } from './components/edit-consumable/edit-consumable.component';
import { ChartsModule } from 'ng2-charts';

import { StoreModule } from '@ngrx/store';
import { reducers } from './_reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects'; 
import { HttpClientModule } from '@angular/common/http';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


@NgModule({
  declarations: [
    AppComponent,
    MenuNavComponent,
    SideNavDatesComponent,
    DataPointComponent,

    LineChartComponent,
    ScatterChartComponent,
    RadarChartComponent,
    MonthlyRadarComponent,

    EditDataPointComponent,
    EditExerciseComponent,
    EditActivityComponent,
    EditConsumableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatGridListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,
    ChartsModule,
    HttpClientModule,
    EffectsModule.forRoot([AppEffects])
  ],
  exports:[
    MatMenuModule,
    MatGridListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SideNavDatesComponent]
})
export class AppModule { }
