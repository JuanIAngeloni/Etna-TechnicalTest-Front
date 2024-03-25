import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  public isValidField(form: FormGroup, field: string): boolean {
    const control = form.controls[field];
    
    if (control && control.errors && control.touched) {
        return true;
    } else {
        return false;
    }
}


  public repeatPasswordValidation(password : string, confirmPassword: string){
return null;

  }


  getFieldError(form: FormGroup, field: string): string | null {

    if (!form.controls[field]) return null;
    const errors = form.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'pattern':
          return 'The code format is incorrect';
        case 'minor':
          return 'The age cannot be less than 16 years old.';
        case 'houseAndAALNNotEqual':
          return 'The house in the AALN and the selected must be equal';
        case 'aalnSchoolError':
          return 'The selected house must belong to the School in the AALN';
        case 'invalidAALN':
          return 'For the OT house, the school initials should be OT';
      }
    }
    return null;
  }
}
