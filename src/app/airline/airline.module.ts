import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AirlineRoutingModule } from './airline-routing.module';
import { FlightsComponent } from './flights/flights.component';
import { AdminSharedModule } from '../admin/admin-shared/admin-shared.module';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    FlightsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AirlineRoutingModule,
    AdminSharedModule
  ]
})
export class AirlineModule { }
