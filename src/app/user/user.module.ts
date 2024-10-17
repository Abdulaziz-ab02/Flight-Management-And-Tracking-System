import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FormsModule } from '@angular/forms';
import { UserSharedModule } from './user-shared/user-shared.module';
import { FlightsComponent } from './flights/flights.component';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactusComponent,
    FlightsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    UserSharedModule,
    FormsModule
  ]
})
export class UserModule { }
