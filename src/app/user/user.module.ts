import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactusComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
