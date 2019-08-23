import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { SideNavDatesComponent } from './components/side-nav-dates/side-nav-dates.component';
import { DataPointComponent } from './components/data-point/data-point.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { ScatterChartComponent } from './components/scatter-chart/scatter-chart.component';
import { ChartsModule } from 'ng2-charts';

import { StoreModule } from '@ngrx/store';
import { reducers } from './_reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects'; // Angular CLI environemnt
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MenuNavComponent,
    SideNavDatesComponent,
    DataPointComponent,
    LineChartComponent,
    ScatterChartComponent
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
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatFormFieldModule,
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
