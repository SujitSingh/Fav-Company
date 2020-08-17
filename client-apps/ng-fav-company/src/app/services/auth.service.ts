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

  logoutUser() {
    this.loggedUser.next(null);
    this.clearStorages();
  };

  clearStorages() {
    sessionStorage.clear();
    localStorage.clear();
  };
}
