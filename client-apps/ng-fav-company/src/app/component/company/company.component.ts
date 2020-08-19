import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company } from '../../models/User';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: []
})
export class CompanyComponent implements OnInit {
  @Input() company: Company;
  @Input() userId: String;
  @Input() adminControl: Boolean;
  @Output() onRemove = new EventEmitter<{}>();
  @Output() onFavAdd = new EventEmitter<{}>();
  @Output() onDelete = new EventEmitter<{}>();

  constructor(private companySrvc: CompanyService) { }

  ngOnInit(): void { }

  removeCompanyFromFav(userId, companyId) {
    this.companySrvc.removeCompanyFromFav(userId, companyId).subscribe(
      response => {
        this.onRemove.emit({
          removed: true,
          response
        });
      },
      error => {
        this.onRemove.emit({
          removed: false,
          error: error.error && error.error.error || error
        });
      }
    );
  };

  addCompanyToFav(userId, companyId) {
    this.companySrvc.addCompanyToFav(userId, companyId).subscribe(
      added => {
        this.onFavAdd.emit({
          added: true,
          response: added
        });
      },
      error => {
        this.onFavAdd.emit({
          added: false,
          error: error.error && error.error.error || error
        });
      }
    );
  };

  deleteCompany(companyId) {
    this.companySrvc.deleteCompany(companyId).subscribe(
      deletedRsp => {
        this.onDelete.emit({
          deleted: true,
          response: deletedRsp
        });
      },
      error => {
        this.onDelete.emit({
          deleted: false,
          error: error.error && error.error.error || error
        });
      }
    );
  }

}
