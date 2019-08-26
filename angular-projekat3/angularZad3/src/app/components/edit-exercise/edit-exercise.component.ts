import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataPoint } from 'src/app/_models/dataPoint';
import { Exercise, Activity, Consumable } from 'src/app/_models';
import { DatePipe } from '@angular/common';
import { eExercises } from '../../_models/eExercise';

/** @title Form field theming */
@Component({
    selector: 'edit-exercise',
    templateUrl: 'edit-exercise.component.html',
    styleUrls: ['edit-exercise.component.css'],
})
export class EditExerciseComponent implements OnInit {
    dpForm: FormGroup;
    dpThis$: DataPoint;
    listExercises: Exercise[] = [];
    listActivities: Activity[] = [];
    listConsumables: Consumable[] = [];
    selectedEx: Exercise;


    @Input()
    set dpExercise(ex: Exercise[]) {
        this.listExercises = ex;
        this.selectedEx = this.listExercises[0];
        this.adaptEx();
    }

    constructor(fb: FormBuilder) {
        this.selectedEx = new Exercise("GymTest", 75, new Date(), new Date(), eExercises.Gym, false, "", "desc");
        this.dpForm = fb.group({
            name: [this.selectedEx.name, Validators.maxLength(60)],
            effectiveness: [this.selectedEx.effectiveness, Validators.maxLength(2)],
            startsOn: this.selectedEx.startsOn,
            endsOn: this.selectedEx.endsOn,
            type: this.selectedEx.type,
            ifInjury: this.selectedEx.ifInjury,
            injury: this.selectedEx.injury,
            description: [this.selectedEx.description, Validators.maxLength(1000)],
        });
    }

    ngOnInit() {
    }


    showEx(ex: Exercise) {
        let datePipe = new DatePipe("en-US");
        return ex.effectiveness + " " + ex.name + "\n" + datePipe.transform(ex.startsOn, "hh.mm") + " - " + datePipe.transform(ex.endsOn, "hh.mm");
    }

    selectEx(ex: Exercise) {
        this.selectedEx = ex;
        this.adaptEx();
    }
    adaptEx(){
        this.dpForm.get('name').setValue(this.selectedEx.name);
        this.dpForm.get('effectiveness').setValue(this.selectedEx.effectiveness);
        this.dpForm.get('startsOn').setValue(this.selectedEx.startsOn);
        this.dpForm.get('endsOn').setValue(this.selectedEx.endsOn);
        this.dpForm.get('type').setValue(this.selectedEx.type);
        this.dpForm.get('ifInjury').setValue(this.selectedEx.ifInjury);
        this.dpForm.get('injury').setValue(this.selectedEx.injury);
        this.dpForm.get('description').setValue(this.selectedEx.description);
    }
}