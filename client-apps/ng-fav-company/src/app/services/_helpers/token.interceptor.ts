import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../../models/User';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authSrvc: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loggedUser: User = this.authSrvc.getLoggedUser();
    if (loggedUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${loggedUser.token}`
        }
      });
    }
    return next.handle(request);
  }
}