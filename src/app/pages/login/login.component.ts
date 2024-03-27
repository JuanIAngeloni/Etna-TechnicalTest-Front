import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { USERLOGINEMPTY, UserLogin } from 'src/app/core/models/userLogin';
import { AuthService } from 'src/app/core/services/auth-service';
import { UserService } from 'src/app/core/services/user.service';
import { ValidatorService } from 'src/app/core/services/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword: boolean = true;
  errorMsg: string = '';
  showErrorMsg: boolean = false;

  userLog: UserLogin = USERLOGINEMPTY;


  ngOnInit(): void {

  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private validatorServic: ValidatorService,
    private userService: UserService,
    private authService: AuthService
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loadFormWithRegisterData();

  }


  isValidField(field: string): boolean {
    return this.validatorServic.isValidField(this.loginForm, field);
  }


  isValidName(field: string): string | null {
    const errorMessage = this.validatorServic.getFieldError(this.loginForm, field);
    return errorMessage ? errorMessage : null;
  }

  async logUser() {
    try {
      this.loginForm.markAllAsTouched;
      if (this.loginForm.valid) {
        let user: UserLogin = this.loginForm.value;
        let postLoginUser = await this.userService.postUserLogin(user);
        if (postLoginUser.ok) {

          let token = postLoginUser.data.token ;
          this.authService.setUserInLocalStorage(token);
          console.log(1)
          this.authService.isAuthenticated$();
          console.log(2)
          this.router.navigate(['/task'])

        }
      } else {
        this.loginForm.markAllAsTouched();
      }
    } catch (e) {
      console.log(e)
    }
  }

  loadFormWithRegisterData() {
    const flag = localStorage.getItem('registerFlag');

    if (flag === "true") {
      const email = localStorage.getItem('email');
      const password = localStorage.getItem('password');

      localStorage.setItem('registerFlag', "false");
      this.loginForm = this.fb.group({
        email: [email, [Validators.required, Validators.email]],
        password: [password, Validators.required]
      });
      localStorage.removeItem('password');
      localStorage.removeItem('email');
    }
  }
  redirectToRegisterPage(): void {
    this.router.navigate(['/register']);
  }
}
