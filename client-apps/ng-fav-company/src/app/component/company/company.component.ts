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

}
