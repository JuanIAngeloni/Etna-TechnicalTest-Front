import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { USEREMPTY, UserRegister } from 'src/app/core/models/userRegister';
import { UserService } from 'src/app/core/services/user.service';
import { ValidatorService } from 'src/app/core/services/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  hidePassword: boolean = true;

  userToRegister: UserRegister = USEREMPTY;

  errorMsg : string ="";
  showErrorMsg : boolean = false;
  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(this.validatorService.passwordPatternValidation)]],
    repeatPassword: ['', Validators.required]
  },
    {
      validators: [this.validatorService.repeatPasswordValidation('password', 'repeatPassword')]
    });

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private userService : UserService,
    private router: Router) {
  }
  isValidField(field: string): boolean {
    return this.validatorService.isValidField(this.registerForm, field);
  }


  isValidName(field: string): string | null {
    const errorMessage = this.validatorService.getFieldError(this.registerForm, field);
    return errorMessage ? errorMessage : null;
  }
  isValidSecondPassword(field: string): string | null {
    const errorMessage = this.validatorService.getFieldError(this.registerForm, field);
    return errorMessage ? errorMessage : null;
  }

  async onSubmit() {
    this.registerForm.markAllAsTouched();
    this.showErrorMsg = false;

    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      delete formValues.repeatPassword;

      this.userToRegister = {
        name: formValues.name ?? '',
        lastName: formValues.lastName ?? '',
        email: formValues.email ?? '',
        password: formValues.password ?? ''
      };
      try {
        let postNewUser = await this.userService.postUserRegistration(this.userToRegister);
        if (postNewUser.ok) {
          console.log("UserRegistererd")
          localStorage.setItem('email', this.userToRegister.email);
          localStorage.setItem('password', this.userToRegister.password);
          localStorage.setItem('registerFlag', 'true');
          this.registerForm.reset();
          this.redirectToLoginPage();

        } else {
                  
        }


      }catch(e){
        console.log(e)
    }
    }
  }

  redirectToLoginPage():void {
    this.router.navigate(['/login']);
    }
    
}
