import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
    selectedAc: any;
    starts: string;
    ends: string;
    datePipe: DatePipe;

    @Input() List: Activity[];
    @Output() ListChange = new EventEmitter();

    @Input()
    set dpActivity(ac: Activity[]) {
        this.List = ac;
        this.selectedAc = this.List[0];
        this.adaptAc();
    }

    constructor(fb: FormBuilder) {
        this.datePipe = new DatePipe("en-US");
        this.selectedAc = new Activity("", 0, new Date(), new Date(), eActivities.Other, "empty");
        this.dpForm = fb.group({
            name: [this.selectedAc.name, Validators.maxLength(60)],
            effectiveness: [this.selectedAc.effectiveness, Validators.maxLength(3)],
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
        if (!this.selectedAc) {
            this.dpForm.get('name').setValue("Empty day");
            this.dpForm.get('effectiveness').setValue(0);
            this.starts = "00:00";
            this.ends = "00:00";

            this.dpForm.get('type').setValue(eActivities.Other);
            this.dpForm.get('description').setValue("empty");
        } else {
            this.dpForm.get('name').setValue(this.selectedAc.name);
            this.dpForm.get('effectiveness').setValue(this.selectedAc.effectiveness);
            this.starts = this.datePipe.transform(this.selectedAc.startsOn, "hh:mm");
            this.ends = this.datePipe.transform(this.selectedAc.endsOn, "hh:mm");

            this.dpForm.get('type').setValue(this.selectedAc.type);
            this.dpForm.get('description').setValue(this.selectedAc.description);
        }
    }

    CallChange() {
        this.selectedAc.name = this.dpForm.get('name').value;
        this.selectedAc.effectiveness = this.dpForm.get('effectiveness').value;

        this.selectedAc.startsOn = this.selectedAc.startsOn.toString().slice(0, 10) + "T" + this.dpForm.get('startsOn').value.slice(0, 2) + ":" + this.dpForm.get('startsOn').value.slice(3, 5) + ":00";
        this.selectedAc.endsOn = this.selectedAc.endsOn.toString().slice(0, 10) + "T" + this.dpForm.get('endsOn').value.slice(0, 2) + ":" + this.dpForm.get('endsOn').value.slice(3, 5) + ":00";

        this.selectedAc.type = this.dpForm.get('type').value;
        this.selectedAc.description = this.dpForm.get('description').value;

        this.ListChange.emit(this.List);
    }

    deleteAc(ac) {
        this.List = this.List.filter((x) => x != ac);
        this.ListChange.emit(this.List);
    }
}