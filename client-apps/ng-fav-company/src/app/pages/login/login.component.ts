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

  constructor(private authSrvc: AuthService, private router: Router) { }

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
      },
      error => {
        this.loginObj.errorMsg = error.error.message || 'Login failed';
      }
    );
  };
}
