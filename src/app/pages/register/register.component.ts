import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ValidatorService } from 'src/app/core/services/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  hidePassword:boolean = true;

  public registerForm = this.fb.group({
    name: ['', Validators.required, Validators.maxLength(50)],
    lastName: ['', Validators.required,Validators.maxLength(50)],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  },
  {
    validators: [this.validatorService.repeatPasswordValidation('password', 'confirmPassword')]
  });;
  
  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService) {
  }
  isValidField(field: string): boolean {
    return this.validatorService.isValidField(this.registerForm, field);
  }
  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
