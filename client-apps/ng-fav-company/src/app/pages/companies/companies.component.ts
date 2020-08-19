import { Component, OnInit } from '@angular/core';
import { User, Company } from 'src/app/models/User';
import { CompanyService } from 'src/app/services/company.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: []
})
export class CompaniesComponent implements OnInit {
  user: User;
  companies: Company[];
  successMsg: string;
  errorMsg: string;
  loadingData = true;

  constructor(private authSrvc: AuthService, private companySrvc: CompanyService) { }

  ngOnInit(): void {
    this.user = this.authSrvc.getLoggedUser();
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.loadingData = true;
    this.resetMessages();
    this.companySrvc.getAllCompanies().subscribe(
      (companiesRsp: { companies: Company[] }) => {
        this.companies = companiesRsp.companies;
        this.loadingData = false;
      },
      error => {
        this.loadingData = false;
        this.errorMsg = error.message || error.error.message;
      }
    );
  };

  onAddToFav(event) {
    this.resetMessages();
    if (event && event.added) {
      this.successMsg = event.response.message; // added to fav
    } else {
      this.errorMsg = event.error.message; // failed to add
    }
  };

  onDelete(event) {
    this.resetMessages();
    if (event && event.deleted) {
      this.getAllCompanies(); // refresh the list
      this.successMsg = event.response.message; // deleted
    } else {
      this.errorMsg = event.error.message; // failed to delete
    }
  };

  resetMessages() {
    this.successMsg = '';
    this.errorMsg = '';
  };

}
