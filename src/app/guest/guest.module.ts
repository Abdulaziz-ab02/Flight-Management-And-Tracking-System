import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FlightsComponent } from './flights/flights.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AboutComponent,
    ContactusComponent,
    FlightsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    GuestRoutingModule
  ]
})
export class GuestModule { }
