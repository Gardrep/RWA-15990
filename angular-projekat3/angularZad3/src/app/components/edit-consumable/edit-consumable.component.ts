import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Consumable } from 'src/app/_models';
import { DatePipe } from '@angular/common';
import { eConsumables } from '../../_models/eConsumables';
//import { start } from 'repl';

/** @title Form field theming */
@Component({
    selector: 'edit-consumable',
    templateUrl: 'edit-consumable.component.html',
    styleUrls: ['edit-consumable.component.css'],
})
export class EditConsumableComponent implements OnInit {
    dpForm: FormGroup;
    listConsumables: Consumable[] = [];
    selectedCo: Consumable;
    timeCon: string;
    datePipe: DatePipe;


    @Input()
    set dpConsumable(co: Consumable[]) {
        this.listConsumables = co;
        this.selectedCo = this.listConsumables[0];
        this.adaptCo();
    }

    constructor(fb: FormBuilder) {
        this.datePipe = new DatePipe("en-US");
        this.selectedCo = new Consumable("GymTest",new Date(), eConsumables.Beer);
        this.dpForm = fb.group({
            name: [this.selectedCo.name, Validators.maxLength(60)],
            timeConsumed: this.datePipe.transform(this.selectedCo.timeConsumed, "hh:mm"),
            type: this.selectedCo.type
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit(){
        this.adaptCo();
    }

    get consumableValues(){
        return Object.keys(eConsumables);
    }


    showCo(co: Consumable) {
        return co.name + " " + this.datePipe.transform(co.timeConsumed, "hh:mm");
    }

    selectCo(co: Consumable) {
        this.selectedCo = co;
        this.adaptCo();
    }
    adaptCo(){
        this.dpForm.get('name').setValue(this.selectedCo.name);
        this.timeCon = this.datePipe.transform(this.selectedCo.timeConsumed, "hh:mm");
        this.dpForm.get('type').setValue(this.selectedCo.type);
    }
}