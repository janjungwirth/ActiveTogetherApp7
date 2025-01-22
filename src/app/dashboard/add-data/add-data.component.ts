import {Component, OnInit} from '@angular/core';
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
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";


@Component({
  selector: 'app-add-data', // standalone-Komponente
  imports: [SharedModule, MatCheckbox, MatFormField, MatDatepickerToggle, MatDatepicker, MatFormFieldModule,
    MatNativeDateModule, MatDatepickerInput, MatInput, MatOption, MatSelect, MatButton, MatCard, MatCardContent], // Import der benötigten Module
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
    public storeService: StoreService,
    private backendService: BackendService
  ) {
  }

  public registrationForm: any;


  ngOnInit(): void {
    this.registrationForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      courseId: ['', Validators.required],
      email: ['', [Validators.email]],
      birthdate: [null, Validators.required],
      notifications: [{value: false, disabled: true}],
    });
    this.registrationForm.get('email')?.valueChanges.subscribe(() => {
      const emailFieldValid = this.registrationForm.get('email')?.valid;
      if (emailFieldValid) {
        this.registrationForm.get('notifications')?.enable();
      } else {
        this.registrationForm.get('notifications')?.disable();
      }
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      console.log('Formulardaten:', formData);

      // Beispiel: Sende die Daten an den Backend-Service
      this.backendService.addRegistration(formData, this.storeService.currentPage);
      this.registrationForm.reset();
      this.showAlertSuccess()
    } else {
      console.error('Formular ist ungültig');
      this.showAlertNotSuccess();
    }
  }

  public alertMessageSuccess: string | null = null;
  public alertMessageNotSuccess: string | null = null;

  showAlertSuccess() {
    this.alertMessageSuccess = 'Kurs Registriert!';
    this.alertMessageNotSuccess=null;
  }
  showAlertNotSuccess() {
    this.alertMessageNotSuccess = 'Bitte überprüfe deine Daten!';
    this.alertMessageSuccess=null;
  }

  closeAlert() {
    this.alertMessageSuccess = null;
    this.alertMessageNotSuccess = null;
  }

}
