import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginObj = {
    email: '',
    password: '',
    keepLogged: true,
    errorMsg: ''
  };

  constructor(private authSrvc: AuthService, private router: Router) {
    if (this.authSrvc.getLoggedUser()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void { }

  logIn() {
    this.authSrvc.clearStorages();
    const rememberLogin = this.loginObj.keepLogged;
    const loginObj = {
      email: this.loginObj.email,
      password: this.loginObj.password
    };
    this.authSrvc.logIn(loginObj).subscribe(
      login => {
        this.authSrvc.storeLoggedUser(login, rememberLogin);
        this.navigateToHome();
      },
      error => {
        this.loginObj.errorMsg = error.error.message || 'Login failed';
      }
    );
  };

  navigateToHome() {
    this.router.navigate(['home']);
  };
}
