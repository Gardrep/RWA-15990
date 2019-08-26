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
  MatInputModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { SideNavDatesComponent } from './components/side-nav-dates/side-nav-dates.component';
import { DataPointComponent } from './components/data-point/data-point.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { ScatterChartComponent } from './components/scatter-chart/scatter-chart.component';
import { EditDataPointComponent } from './components/edit-data-point/edit-data-point.component';
import { ChartsModule } from 'ng2-charts';

import { StoreModule } from '@ngrx/store';
import { reducers } from './_reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects'; // Angular CLI environemnt
import { HttpClientModule } from '@angular/common/http';
import { EditExerciseComponent } from './components/edit-exercise/edit-exercise.component';


//import ngTimePicker from 'angular-material-time-picker';

@NgModule({
  declarations: [
    AppComponent,
    MenuNavComponent,
    SideNavDatesComponent,
    DataPointComponent,
    LineChartComponent,
    ScatterChartComponent,
    EditDataPointComponent,
    EditExerciseComponent
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
    //ngTimePicker,
    ChartsModule,
    HttpClientModule,
    EffectsModule.forRoot([AppEffects])
  ],
  exports:[    
    MatDatepickerModule, 
    MatNativeDateModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent, MenuNavComponent, SideNavDatesComponent]
})
export class AppModule { }
