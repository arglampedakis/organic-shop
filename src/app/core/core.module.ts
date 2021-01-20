import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../shared/shared.module';
import { BsNavbarComponent } from './conponents/bs-navbar/bs-navbar.component';
import { HomeComponent } from './conponents/home/home.component';
import { LoginComponent } from './conponents/login/login.component';

@NgModule({
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
