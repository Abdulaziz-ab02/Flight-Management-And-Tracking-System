import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';
import { NavbarComponent } from './userShared/navbar/navbar.component';
import { FooterComponent } from './userShared/footer/footer.component';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactusComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
