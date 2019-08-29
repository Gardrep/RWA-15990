import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
    selectedCo: any;
    timeCon: string;
    datePipe: DatePipe;

    @Input() List: Consumable[];
    @Output() ListChange = new EventEmitter();

    @Input()
    set dpConsumable(co: Consumable[]) {
        console.log("ConsumableList");
        console.log(co);
        this.List = co;
        this.selectedCo = this.List[0];
        this.adaptCo();
    }

    constructor(fb: FormBuilder) {
        this.datePipe = new DatePipe("en-US");
        this.selectedCo = new Consumable("GymTest", new Date(), eConsumables.Beer);
        this.dpForm = fb.group({
            name: [this.selectedCo.name, Validators.maxLength(60)],
            timeConsumed: this.datePipe.transform(this.selectedCo.timeConsumed, "hh:mm"),
            type: this.selectedCo.type
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.adaptCo();
    }

    get consumableValues() {
        return Object.keys(eConsumables);
    }


    showCo(co: Consumable) {
        return co.name + " " + this.datePipe.transform(co.timeConsumed, "hh:mm");
    }

    selectCo(co: Consumable) {
        this.selectedCo = co;
        this.adaptCo();
    }
    adaptCo() {
        if (!this.selectedCo) {
            console.log("JUP GRESKA");
            this.dpForm.get('name').setValue("Empty day");
            this.timeCon = "00:00";
            this.dpForm.get('type').setValue(eConsumables.Other);
        } else {
            this.dpForm.get('name').setValue(this.selectedCo.name);
            this.timeCon = this.datePipe.transform(this.selectedCo.timeConsumed, "hh:mm");
            this.dpForm.get('type').setValue(this.selectedCo.type);
        }
    }

    CallChange() {
        this.selectedCo.name = this.dpForm.get('name').value;
        this.selectedCo.timeConsumed = this.selectedCo.timeConsumed.toString().slice(0, 10) + "T" + this.dpForm.get('timeConsumed').value.slice(0, 2) + ":" + this.dpForm.get('timeConsumed').value.slice(3, 5) + ":00";
        this.selectedCo.type = this.dpForm.get('type').value;

        this.ListChange.emit(this.List);
    }

    deleteCo(co) {
        this.List = this.List.filter((x) => x != co);
        this.ListChange.emit(this.List);
    }
}