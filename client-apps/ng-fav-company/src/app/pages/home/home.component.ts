import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User, UserInfo } from '../../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user = <User>{};
  userInfo = <UserInfo>{};
  loadingData = true;
  errorMsg = '';

  constructor(private router: Router, private authSrvc: AuthService, private userSrvc: UserService) { }

  ngOnInit(): void {
    this.user = this.authSrvc.getLoggedUser();
    this.fetchUserInfo();
  }

  fetchUserInfo() {
    this.loadingData = true;
    this.errorMsg = '';
    this.userSrvc.getUserInfo(this.user._id).subscribe(
      (userInfo: UserInfo) => {
        this.userInfo = userInfo;
      },
      error => {
        this.errorMsg = error.message || error.error.message;
        this.loadingData = false;
      },
      () => {
        this.loadingData = false;
      }
    );
  };

  removeCompanyFromFav(companyId) {
    this.errorMsg = '';
    const userId = this.userInfo._id;
    this.userSrvc.removeCompanyFromFav(userId, companyId).subscribe(
      removed => {
        this.fetchUserInfo();
      },
      error => {
        this.errorMsg = error.message || error.error.message;
      }
    );
  };

}
