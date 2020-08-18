import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from './data.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedUserKey = 'loggedUser';
  loggedUser = new BehaviorSubject<User>(null);

  constructor(private dataSrvc: DataService, private http: HttpClient) { }

  logIn(loginObj): Observable<any> {
    const api = this.dataSrvc.apiRoot + '/api/user/login';
    console.log(api);
    return this.http.post(api, loginObj);
  };

  signUp(signUpObj): Observable<any> {
    const api = this.dataSrvc.apiRoot + '/api/user/signup';
    return this.http.post(api, signUpObj);
  };

  storeLoggedUser(loginObj, rememberUser) {
    // store details of logged user
    if (rememberUser) {
      // in localStorage
      localStorage.setItem(this.loggedUserKey, JSON.stringify(loginObj));
    } else  {
      // in sessionStorage
      sessionStorage.setItem(this.loggedUserKey, JSON.stringify(loginObj));
    }
    this.loggedUser.next(loginObj);
  };

  getLoggedUser(): User {
    if (this.loggedUser.value) { return this.loggedUser.getValue(); }
    let userDetails: User;
    // check in localStorage
    userDetails = JSON.parse(localStorage.getItem(this.loggedUserKey));
    if (!userDetails) {
      // check in sessionStorage
      userDetails = JSON.parse(sessionStorage.getItem(this.loggedUserKey));
    }
    if (userDetails) { this.loggedUser.next(userDetails); }
    return this.loggedUser.getValue();
  };

  logoutUser() {
    this.loggedUser.next(null);
    this.clearStorages();
  };

  clearStorages() {
    sessionStorage.clear();
    localStorage.clear();
  };
}
