import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private dataSrvc: DataService, private http: HttpClient) { }

  getUserInfo(userId) {
    const api = this.dataSrvc.apiRoot + `/api/user/${userId}`;
    return this.http.get(api);
  };

  removeCompanyFromFav(userId, companyId) {
    const api = this.dataSrvc.apiRoot + `/api/user/${userId}/company/${companyId}/remove-from-fav`;
    return this.http.post(api, {});
  };
}