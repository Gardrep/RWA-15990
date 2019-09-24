import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataPoint } from 'src/app/_models/dataPoint';
import { Exercise } from 'src/app/_models';
import { DatePipe } from '@angular/common';
import { eExercises } from '../../_models/eExercise';

@Component({
    selector: 'edit-exercise',
    templateUrl: 'edit-exercise.component.html',
    styleUrls: ['edit-exercise.component.css'],
})
export class EditExerciseComponent implements OnInit {
    dpForm: FormGroup;
    dpThis$: DataPoint;
    listExercises: Exercise[] = [];
    selectedEx: any;
    starts: string;
    ends: string;
    datePipe: DatePipe;

    @Input() List: Exercise[];
    @Output() ListChange = new EventEmitter();

    withdraw() {
        this.List = [];
        this.ListChange.emit(this.List);
    }

    @Input()
    set dpExercise(ex: Exercise[]) {
        this.List = ex;
        this.selectedEx = this.List[0];
        this.adaptEx();
    }

    constructor(fb: FormBuilder) {
        this.datePipe = new DatePipe("en-US");
        this.selectedEx = new Exercise("GymTest", 75, new Date(), new Date(), eExercises.Gym, false, "", "desc");
        this.dpForm = fb.group({
            name: [this.selectedEx.name, Validators.maxLength(60)],
            effectiveness: [this.selectedEx.effectiveness, Validators.maxLength(3)],
            startsOn: this.datePipe.transform(this.selectedEx.startsOn, "hh:mm"),
            endsOn: this.datePipe.transform(this.selectedEx.endsOn, "hh:mm"),
            type: this.selectedEx.type,
            ifInjury: this.selectedEx.ifInjury,
            injury: this.selectedEx.injury,
            description: [this.selectedEx.description, Validators.maxLength(1000)],
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.adaptEx();
    }

    get exerciseValues() {
        return Object.keys(eExercises);
    }


    showEx(ex: Exercise) {
        return ex.effectiveness + " " + ex.name + "\n" + this.datePipe.transform(ex.startsOn, "hh:mm") + " - " + this.datePipe.transform(ex.endsOn, "hh:mm");
    }

    selectEx(ex: Exercise) {
        this.selectedEx = ex;
        this.adaptEx();
    }
    adaptEx() {
        if (!this.selectedEx) {
            this.dpForm.get('name').setValue("Empty day");
            this.dpForm.get('effectiveness').setValue(0);
            this.starts = "00:00";
            this.ends = "00:00";

            this.dpForm.get('type').setValue(eExercises.Other);
            this.dpForm.get('ifInjury').setValue(false);
            this.dpForm.get('injury').setValue("");
            this.dpForm.get('description').setValue("empty");
        } else {
            this.dpForm.get('name').setValue(this.selectedEx.name);
            this.dpForm.get('effectiveness').setValue(this.selectedEx.effectiveness);
            this.starts = this.datePipe.transform(this.selectedEx.startsOn, "hh:mm");
            this.ends = this.datePipe.transform(this.selectedEx.endsOn, "hh:mm");

            this.dpForm.get('type').setValue(this.selectedEx.type);
            this.dpForm.get('ifInjury').setValue(this.selectedEx.ifInjury);
            this.dpForm.get('injury').setValue(this.selectedEx.injury);
            this.dpForm.get('description').setValue(this.selectedEx.description);
        }

    }

    CallChange() {
        this.selectedEx.name = this.dpForm.get('name').value;
        this.selectedEx.effectiveness = this.dpForm.get('effectiveness').value;

        this.selectedEx.startsOn = this.selectedEx.startsOn.toString().slice(0, 10) + "T" + this.dpForm.get('startsOn').value.slice(0, 2) + ":" + this.dpForm.get('startsOn').value.slice(3, 5) + ":00";
        this.selectedEx.endsOn = this.selectedEx.endsOn.toString().slice(0, 10) + "T" + this.dpForm.get('endsOn').value.slice(0, 2) + ":" + this.dpForm.get('endsOn').value.slice(3, 5) + ":00";

        this.selectedEx.type = this.dpForm.get('type').value;
        this.selectedEx.ifInjury = this.dpForm.get('ifInjury').value;
        this.selectedEx.injury = this.dpForm.get('injury').value;
        this.selectedEx.description = this.dpForm.get('description').value;

        this.ListChange.emit(this.List);
    }

    deleteEx(ex) {
        this.List = this.List.filter((x) => x != ex);
        this.ListChange.emit(this.List);
    }
}