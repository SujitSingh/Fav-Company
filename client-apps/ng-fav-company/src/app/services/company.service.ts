import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private dataSrvc: DataService, private http: HttpClient) { }

  getAllCompanies() {
    const api = this.dataSrvc.apiRoot + `/api/company/all`;
    return this.http.get(api);
  };

  addCompanyToFav(userId, companyId) {
    const api = this.dataSrvc.apiRoot + `/api/user/${userId}/company/${companyId}/add-to-fav`;
    return this.http.post(api, {});
  };

  removeCompanyFromFav(userId, companyId) {
    const api = this.dataSrvc.apiRoot + `/api/user/${userId}/company/${companyId}/remove-from-fav`;
    return this.http.post(api, {});
  };

  deleteCompany(companyId) {
    const api = this.dataSrvc.apiRoot + `/api/company/${companyId}/remove`;
    return this.http.delete(api);
  };

}
