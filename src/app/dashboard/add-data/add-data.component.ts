import { Component , OnInit} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {Validators, FormBuilder} from '@angular/forms';
import {StoreService} from '../../shared/store.service';
import {BackendService} from '../../shared/backend.service';
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {MatSelect} from "@angular/material/select";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";


@Component({
    selector: 'app-add-data', // standalone-Komponente
    imports: [SharedModule, MatCheckbox, MatFormField, MatDatepickerToggle, MatDatepicker, MatFormFieldModule,
        MatNativeDateModule, MatDatepickerInput, MatInput, MatOption, MatSelect, MatButton], // Import der benötigten Module
    templateUrl: './add-data.component.html',
    styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

    constructor(private formbuilder: FormBuilder, public storeService: StoreService, private backendService: BackendService) {
    }

    public registrationForm: any;

    ngOnInit(): void {
        this.registrationForm = this.formbuilder.group({
            name: ['', [Validators.required]],
            courseId: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]], // Email Feld
            birthdate: [null, Validators.required],
            notifications: [false], // Checkbox (true oder false)
        })
    }

    onSubmit() {
        if (this.registrationForm.valid) {
            const formData = this.registrationForm.value;
            console.log('Formulardaten:', formData);

            // Beispiel: Sende die Daten an den Backend-Service
            this.backendService.addRegistration(formData, this.storeService.currentPage);
            this.registrationForm.reset();

        } else {
            console.error('Formular ist ungültig');
        }
    }

}
