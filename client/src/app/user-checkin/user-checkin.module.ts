import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCheckinRoutingModule } from './user-checkin-routing.module';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    UserCheckinRoutingModule
  ]
})
export class UserCheckinModule { }
