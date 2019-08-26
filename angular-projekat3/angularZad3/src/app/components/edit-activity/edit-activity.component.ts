import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity, eActivities } from 'src/app/_models';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'edit-activity',
    templateUrl: 'edit-activity.component.html',
    styleUrls: ['edit-activity.component.css'],
})
export class EditActivityComponent implements OnInit {
    dpForm: FormGroup;
    listActivities: Activity[] = [];
    selectedAc: Activity;
    starts: string;
    ends: string;
    datePipe: DatePipe;


    @Input()
    set dpActivity(ac: Activity[]) {
        this.listActivities = ac;
        this.selectedAc = this.listActivities[0];
        this.adaptAc();
    }

    constructor(fb: FormBuilder) {
        this.datePipe = new DatePipe("en-US");
        this.selectedAc = new Activity("", 0, new Date(), new Date(), eActivities.Other, "empty");
        console.log(this.selectedAc);
        this.dpForm = fb.group({
            name: [this.selectedAc.name, Validators.maxLength(60)],
            effectiveness: [this.selectedAc.effectiveness, Validators.maxLength(2)],
            startsOn: this.datePipe.transform(this.selectedAc.startsOn, "hh:mm"),
            endsOn: this.datePipe.transform(this.selectedAc.endsOn, "hh:mm"),
            type: this.selectedAc.type,
            description: [this.selectedAc.description, Validators.maxLength(1000)],
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.adaptAc();
    }

    get activityValues() {
        return Object.keys(eActivities);
    }


    showAc(ac: Activity) {
        return ac.effectiveness + " " + ac.name + "\n" + this.datePipe.transform(ac.startsOn, "hh:mm") + " - " + this.datePipe.transform(ac.endsOn, "hh:mm");
    }

    selectAc(ac: Activity) {
        this.selectedAc = ac;
        this.adaptAc();
    }

    adaptAc() {
        console.log(this.selectedAc);
        this.dpForm.get('name').setValue(this.selectedAc.name);
        this.dpForm.get('effectiveness').setValue(this.selectedAc.effectiveness);
        this.starts = this.datePipe.transform(this.selectedAc.startsOn, "hh:mm");
        this.ends = this.datePipe.transform(this.selectedAc.endsOn, "hh:mm");

        this.dpForm.get('type').setValue(this.selectedAc.type);
        this.dpForm.get('description').setValue(this.selectedAc.description);
    }
}