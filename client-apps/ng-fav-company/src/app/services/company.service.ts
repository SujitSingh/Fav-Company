import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private dataSrvc: DataService, private http: HttpClient) { }

  removeCompanyFromFav(userId, companyId) {
    const api = this.dataSrvc.apiRoot + `/api/user/${userId}/company/${companyId}/remove-from-fav`;
    return this.http.post(api, {});
  };

  deleteCompany(companyId) {
    const api = this.dataSrvc.apiRoot + `/company/remove/${companyId}`;
    return this.http.delete(api);
  };

}
