import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckinComponent } from './checkin.component';
import { UserCheckinRoutingModule } from './user-checkin-routing.module';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

@NgModule({
  declarations: [CheckinComponent, LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    UserCheckinRoutingModule
  ],
  bootstrap: [CheckinComponent]
})
export class UserCheckinModule { }
