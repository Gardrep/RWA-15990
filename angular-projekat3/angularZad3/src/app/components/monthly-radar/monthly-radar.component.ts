import { Component, OnInit, Input } from '@angular/core';
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
    dataPoints$: Observable<IDataPoint[]>;
    dataPointList: DataPoint[] = [];

    showLabelsRadar: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running', 'Hobby'];
    showListRadar: ChartDataSets[] = [{ data: [100, 100, 100, 100, 100, 100, 100, 100], label: 'Empty series' }];

    showLabelsBar: Label[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
    showListBar: ChartDataSets[] = [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], label: 'Empty series' }];

    //startDate: Date = new Date(2019, 5, 23);
    monthlyDate: Date = new Date(2019, 5, 23);
    monthlyChoice: string = "Activities";

    datePipe: DatePipe = new DatePipe("en-US");;
    IsRadio: boolean = true;

    dataPointTypes: string[] = ["Activities", "Exercises", "Consumables"];

    constructor(private store: Store<State>) {
    }

    ngOnInit() {
        this.store.dispatch(dataPointActions.loadDataPoints());

        this.dataPoints$ = this.store.select(allReducers.selectAllDataPoints);
        this.dataPointList = Array();
        this.dataPoints$.subscribe((dps) => {
            this.dataPointList = Array();
            dps.map((dp) => {
                this.dataPointList.push(dp);
            })
            this.Change();
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

    Change() {
        let list: any[] = [];
        this.dataPointList.map((dp) => {
            console.log(dp.date);
            if (this.datePipe.transform(dp.date, "MM:yyyy") == this.datePipe.transform(this.monthlyDate, "MM:yyyy")) {
                dp[this.monthlyChoice.toLowerCase()].forEach(element => {
                    list.push(element);
                });
            }
        });
        if (list.length != 0) {
            this[`CDS${this.monthlyChoice}`](list);
        }
    }

    CDSActivities(list: Array<any>) {
        let eff: number;
        let i: number;
        let nizEff: Array<number> = [];
        let nizBar: Array<number> = [];
        let barLabels: string[] = [];
        for (i = 1; i <= this.getDaysInMonth(this.datePipe.transform(list[0].startsOn, "MM"), this.datePipe.transform(list[0].startsOn, "yyyy")); i++) {
            nizBar.push(0);
            barLabels.push(i.toString());
        }
        this.showListBar = [];
        this.showLabelsBar = barLabels;
        Object.keys(eActivities).forEach(element => {
            eff = 0;
            i = 0;
            nizBar = [];
            for (i = 1; i <= this.getDaysInMonth(this.datePipe.transform(list[0].startsOn, "MM"), this.datePipe.transform(list[0].startsOn, "yyyy")); i++) {
                nizBar.push(0);
            }
            list.map((obj: Activity) => {
                if (element == obj.type) {
                    eff = parseInt(eff.toString()) + parseInt(obj.effectiveness.toString());
                    i++;
                    let date = parseInt(this.datePipe.transform(obj.startsOn, "dd"), 10) - 1;
                    if (date < 0) date = date + this.getDaysInMonth(this.datePipe.transform(obj.startsOn, "MM"), this.datePipe.transform(obj.startsOn, "yyyy"));
                    nizBar[date] = obj.effectiveness;
                }
            });
            if (i == 0) {
                nizEff.push(0);
            }
            else {
                nizEff.push(eff / i);
            }
            this.showListBar.push({ data: nizBar, label: element });
        });
        this.showListRadar = [{ data: nizEff, label: 'Activity for ' + this.datePipe.transform(list[0].startsOn, "MM:yyyy") }];
        this.showLabelsRadar = Object.keys(eActivities);
    }

    CDSExercises(list: Array<any>) {
        let eff: number;
        let i: number;
        let nizEff: Array<number> = [];
        let nizBar: Array<number> = [];
        let barLabels: string[] = [];
        for (i = 1; i <= this.getDaysInMonth(this.datePipe.transform(list[0].startsOn, "MM"), this.datePipe.transform(list[0].startsOn, "yyyy")); i++) {
            nizBar.push(0);
            barLabels.push(i.toString());
        }
        this.showListBar = [];
        this.showLabelsBar = barLabels;
        Object.keys(eExercises).forEach(element => {
            eff = 0;
            i = 0;
            nizBar = [];
            for (i = 1; i <= this.getDaysInMonth(this.datePipe.transform(list[0].startsOn, "MM"), this.datePipe.transform(list[0].startsOn, "yyyy")); i++) {
                nizBar.push(0);
            }
            list.map((obj: Exercise) => {
                if (element == obj.type) {
                    eff = parseInt(eff.toString()) + parseInt(obj.effectiveness.toString());
                    i++;
                    let date = parseInt(this.datePipe.transform(obj.startsOn, "dd"), 10) - 1;
                    if (date < 0) date = date + this.getDaysInMonth(this.datePipe.transform(obj.startsOn, "MM"), this.datePipe.transform(obj.startsOn, "yyyy"));
                    nizBar[date] = obj.effectiveness;
                }
            });
            if (i == 0) {
                nizEff.push(0);
            }
            else {
                nizEff.push(eff / i);
            }
            this.showListBar.push({ data: nizBar, label: element });
        });
        this.showListRadar = [{ data: nizEff, label: 'Exercise for ' + this.datePipe.transform(list[0].startsOn, "MM:yyyy") }];
        this.showLabelsRadar = Object.keys(eExercises);
    }

    CDSConsumables(list: Array<Consumable>) {
        let eff;
        let i: number;
        let nizEff: Array<number> = [];
        let nizBar: Array<number> = [];
        let barLabels: string[] = [];
        for (i = 1; i <= this.getDaysInMonth(this.datePipe.transform(list[0].timeConsumed, "MM"), this.datePipe.transform(list[0].timeConsumed, "yyyy")); i++) {
            nizBar.push(0);
            barLabels.push(i.toString());
        }
        this.showListBar = [];
        this.showLabelsBar = barLabels;
        Object.keys(eConsumables).forEach(element => {
            eff = 0;
            i = 0;
            nizBar = [];
            for (i = 1; i <= this.getDaysInMonth(this.datePipe.transform(list[0].timeConsumed, "MM"), this.datePipe.transform(list[0].timeConsumed, "yyyy")); i++) {
                nizBar.push(0);
            }
            list.map((obj: Consumable) => {
                if (element == obj.type) {
                    eff++;
                    let date = parseInt(this.datePipe.transform(obj.timeConsumed, "dd"), 10) - 1;
                    if (date < 0) date = date + this.getDaysInMonth(this.datePipe.transform(obj.timeConsumed, "MM"), this.datePipe.transform(obj.timeConsumed, "yyyy"));
                    nizBar[date]++;
                }
            });
            nizEff.push(eff);
            this.showListBar.push({ data: nizBar, label: element });
        });
        this.showListRadar = [{ data: nizEff, label: 'Consumable for ' + this.datePipe.transform(list[0].timeConsumed, "MM:yyyy") }];
        this.showLabelsRadar = Object.keys(eConsumables);
    }

    RadioToggle() {
        this.IsRadio = !this.IsRadio;
    }

    getDaysInMonth = function (month: string, year: string) {
        return new Date(parseInt(year), parseInt(month), 0).getDate();
    };

}