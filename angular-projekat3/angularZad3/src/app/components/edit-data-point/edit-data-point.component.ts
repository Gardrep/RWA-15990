import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataPoint } from 'src/app/_models/dataPoint';
import { Exercise, Activity, Consumable } from 'src/app/_models';
import { DatePipe } from '@angular/common';

/** @title Form field theming */
@Component({
    selector: 'edit-data-point',
    templateUrl: 'edit-data-point.component.html',
    styleUrls: ['edit-data-point.component.css'],
})
export class EditDataPointComponent implements OnInit {
    dpForm: FormGroup;
    dpThis$: DataPoint;

    @Input()
    set dpThis(dp: DataPoint) {
        this.dpThis$ = dp;

        this.dpForm.get('name').setValue(this.dpThis$.name);
        this.dpForm.get('date').setValue(this.dpThis$.date);
        this.dpForm.get('happiness').setValue(this.dpThis$.happy);
        this.dpForm.get('diary').setValue(this.dpThis$.diary);
    }

    constructor(fb: FormBuilder) {
        this.dpThis$ = new DataPoint(-10, "Prazan", new Date(), -1, "empty");
        this.dpForm = fb.group({
            name: [this.dpThis$.name, Validators.maxLength(60)],
            date: this.dpThis$.date,
            happiness: [this.dpThis$.happy, Validators.maxLength(2)],
            diary: [this.dpThis$.diary, Validators.maxLength(1000)],
        });
    }

    ngOnInit() {
    }

    showDate(){
        let datePipe = new DatePipe("en-US");
        return datePipe.transform(this.dpThis$.date, "dd.MM hh:mm")
    }


    getFontSize() {
        return Math.max(1, this.dpForm.value.happiness);
    }
}