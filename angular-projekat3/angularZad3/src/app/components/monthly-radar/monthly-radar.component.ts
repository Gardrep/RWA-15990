import { Component, OnInit } from '@angular/core';
import { DataPoint } from 'src/app/_models/dataPoint';
import * as dataPointActions from '../../_actions/datapoint.actions';
import { IDataPoint } from 'src/app/_models/IDatapoint';
import { Observable } from 'rxjs';
import { State } from 'src/app/_reducers';
import { Store } from '@ngrx/store';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import * as allReducers from '../../_reducers';
import { DatePipe } from '@angular/common';
import { eActivities, eConsumables, eExercises, Activity, Exercise, Consumable } from 'src/app/_models';

/** @title Form field theming */
@Component({
    selector: 'monthly-radar',
    templateUrl: 'monthly-radar.component.html',
    styleUrls: ['monthly-radar.component.css'],
})
export class MonthlyRadarComponent implements OnInit {
    dpThis$: DataPoint;
    showLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running','Hobby'];
    showList: ChartDataSets[] = [{ data: [100, 100, 100, 100, 100, 100, 100, 100], label: 'Empty series' }];
    startDate = new Date(2019, 8, 23);
    monthlyDate: Date = new Date();
    monthlyChoice: string = "Activites";
    dataPoints$: Observable<IDataPoint[]>;
    dataPointList: DataPoint[] = [];
    datePipe: DatePipe;

    constructor(private store: Store<State>) {
    }

    ngOnInit() {
        this.store.dispatch(dataPointActions.loadDataPoints());
        this.datePipe = new DatePipe("en-US");

        this.dataPoints$ = this.store.select(allReducers.selectAllDataPoints);
        this.dataPointList = Array();
        this.dataPoints$.subscribe((dps) => {
            this.dataPointList = Array();
            dps.map((dp) => {
                this.dataPointList.push(dp);
            })
        })
    }
    /*
        showDate(){
            let datePipe = new DatePipe("en-US");
            return datePipe.transform(this.dpThis$.date, "dd.MM hh:mm")
        }
        saveDP(){
         let pomdp: DataPoint = new DataPoint(700, "Bas Lep Dan", new Date(), 5, "empty");
        let pomexer = new Exercise("kalistenika na keju",50,new Date(),new Date(),eExercises.Calisthenics,false,"","neki opis");
        /*pomexer.name = "kalistenika na keju";
        pomexer.description = "neki opis";
        pomexer.effectiveness = 50;
        pomexer.ifInjury = false;
        pomexer.startsOn = new Date();
        pomexer.endsOn = new Date();
        pomdp.exercises.push(pomexer);
        this.store.dispatch(dataPointActions.addDataPoint({ dataPoint: pomdp }));
        }
        */
    EndDateChange(event) {
        this.monthlyDate = new Date(event.value);
        this.Change();
    }

    ChangeList(data: any) {
        switch (data) {
            case "Activites": {
                this.monthlyChoice = "Activites";
                this.Change();
            } break;
            case "Exercises": {
                this.monthlyChoice = "Exercises";
                this.Change();
            } break;
            case "Consumables": {
                this.monthlyChoice = "Consumables";
                this.Change();
            } break;
        }
    }

    Change() {
        let list: any[] = [];
        this.dataPointList.map((dp) => {
            if (this.datePipe.transform(dp.date, "MM:yyyy") == this.datePipe.transform(this.monthlyDate, "MM:yyyy")) {
                switch (this.monthlyChoice) {
                    case "Activites": {
                        dp.activities.forEach(element => { list.push(element); })

                    } break;
                    case "Exercises": {
                        dp.exercises.forEach(element => { list.push(element); })
                    } break;
                    case "Consumables": {
                        dp.consumables.forEach(element => { list.push(element); })
                    } break;
                }
            }
        });
        console.log(list);
        if (list.length != 0) {
            console.log(list);
            switch (this.monthlyChoice) {
                case "Activites": {
                    this.CDSActivities(list);
                } break;
                case "Exercises": {
                    this.CDSExercises(list);
                } break;
                case "Consumables": {
                    this.CDSConsumables(list);
                } break;
            }
        }
    }

    CDSActivities(list: Array<any>) {
        let eff: number;
        let i: number;
        let nizEff: Array<number> = [];
        Object.keys(eActivities).forEach(element => {
            eff = 0;
            i =0;
            console.log(list.length);
            list.map((obj: Activity) => {
                if (element == obj.type) {
                    eff = parseInt(eff.toString())+ parseInt(obj.effectiveness.toString());
                    i++;
                }
            });
            if(i==0)
            nizEff.push(0);
            else
            nizEff.push(eff / i);
        });
        this.showList = [{ data: nizEff, label: 'Activity for ' + this.datePipe.transform(list[0].startsOn, "MM:yyyy") }];
        this.showLabels = Object.keys(eActivities);
        console.log(nizEff);
    }

    CDSExercises(list: Array<any>) {
        let eff: number;
        let i: number;
        let nizEff: Array<number> = [];
        Object.keys(eExercises).forEach(element => {
            eff = 0;
            i =0;
            list.map((obj: Exercise) => {
                if (element == obj.type) {
                    eff = parseInt(eff.toString())+ parseInt(obj.effectiveness.toString());
                    i++;
                }
            });
            if(i==0)
            nizEff.push(0);
            else
            nizEff.push(eff / i);
        });
        this.showList.push({ data: nizEff, label: 'Exercise for ' + this.datePipe.transform(list[0].startsOn, "MM:yyyy") });
        this.showLabels = Object.keys(eExercises);
    }

    CDSConsumables(list: Array<any>) {
        let eff;
        let nizEff: Array<number> = [];
        Object.keys(eConsumables).forEach(element => {
            eff = 0;
            list.map((obj: Consumable) => {
                if (element == obj.type) {
                    eff++;
                }
            });
            nizEff.push(eff);
        });
        this.showList.push({ data: nizEff, label: 'Consumable for ' + this.datePipe.transform(list[0].startsOn, "MM:yyyy") });
        this.showLabels = Object.keys(eConsumables);
    }
}