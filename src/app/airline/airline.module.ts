import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AirlineRoutingModule } from './airline-routing.module';
import { FlightsComponent } from './flights/flights.component';


@NgModule({
  declarations: [
    FlightsComponent
  ],
  imports: [
    CommonModule,
    AirlineRoutingModule
  ]
})
export class AirlineModule { }
