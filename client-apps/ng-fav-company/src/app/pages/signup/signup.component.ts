import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {
  signupObj = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    errorMsg: '',
    successMsg: ''
  };

  constructor(private authSrvc: AuthService) { }

  ngOnInit(): void { }

  signUp() {
    if (this.signupObj.password === this.signupObj.rePassword) {
      this.signupObj.successMsg = '';
      this.signupObj.errorMsg = '';
      const registerObj = {
        email: this.signupObj.email,
        name: this.signupObj.name,
        password: this.signupObj.password
      };
      this.authSrvc.signUp(registerObj).subscribe(
        signed => {
          this.resetSignupForm();
          this.signupObj.successMsg = signed.message;
        },
        error => {
          this.signupObj.errorMsg = error.error.message || 'Sign up failed';
        }
      );
    } else {
      this.signupObj.errorMsg = 'Please enter matching passwords';
    }
  };

  resetSignupForm() {
    Object.keys(this.signupObj).forEach(key => {
      this.signupObj[key] = '';
    });
  };

}
