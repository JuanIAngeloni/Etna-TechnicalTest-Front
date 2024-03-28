import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }
  public passwordPatternValidation: string = '^(?=.*\\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[:;<.,>?`=_|"]).{8,}$';


  public isValidField(form: FormGroup, field: string): boolean {
    const control = form.controls[field];
    if (control && control.errors && control.touched) {
      return true;
    } else {
      return false;
    }
  }

  public repeatPasswordValidation(password: string, repeatPassword: string): any {
    return (formGroup: FormGroup): ValidationErrors | null => {
      let firstPassword = formGroup.get(password)?.value;
      let repeatedPassword = formGroup.get(repeatPassword)?.value;

      if (firstPassword !== repeatedPassword) {
        formGroup.get(repeatPassword)?.setErrors({ equalPasswordsFields: true });
        return { equalPasswordsFields: true };
      } else {
        formGroup.get(repeatPassword)?.setErrors(null);
        return null;
      }
    };
  }






  getFieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null;
    const errors = form.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido.';
        case 'maxlength':
          return 'El maximo de caracteres posible es 50.';
        case 'email':
          return 'Este campo debe tener un formato de email.';
        case 'pattern':
          return 'minimo 8 caracteres, 1 dígito numérico, 1 letra mayuscula y 1 carácter no alfanumérico (!, . -, etc.).';
        case 'equalPasswordsFields':
          return 'Las contraseñas ingresadas no coinciden.';
        case 'min':
          return 'Debe ser un numero entre 1 y 5.';
        case 'max':
          return 'Debe ser un numero entre 1 y 5.';

      }
    }
    return null;
  }
}
