import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { User } from '../../models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styles: [`nav .brand-logo {
              font-size: 20px;
            }`]
})
export class TopNavComponent implements OnInit {
  isLoginPage = false;
  user = <User>{};

  constructor(private router: Router, private authSrvc: AuthService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      // listen to routes changes
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login';
      }
    });

    // listen for user changes
    this.authSrvc.loggedUser.subscribe(
      (userObj: User) => {
        this.user = userObj;
      }
    );
  }

  logout() {
    this.authSrvc.logoutUser();
    this.router.navigate(['/login']);
  }

}
