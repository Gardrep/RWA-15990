import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
    selector: 'dynamic-chart',
    templateUrl: './dynamic-chart.component.html',
    styleUrls: ['./dynamic-chart.component.css']
})
export class DynamicChartComponent implements OnInit {
    public barChartOptions: ChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: { xAxes: [{}], yAxes: [{}] },
    };
    public barChartLabels: Label[] = [];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;

    public barChartData: ChartDataSets[] = [];

    @Input()
    set showList(data: ChartDataSets[]) {
      this.barChartData = data;
    }
  
    @Input()
    set showLabels(labels :Label[]) {
      this.barChartLabels = labels;
    }

    constructor() { }

    ngOnInit() {
    }

    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    public randomize(): void {
        this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
    }
}