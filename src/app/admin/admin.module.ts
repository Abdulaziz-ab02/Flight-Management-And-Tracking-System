import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AirportsComponent } from './airports/airports.component';
import { FlightsComponent } from './flights/flights.component';
import { UsersComponent } from './users/users.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { ManageAboutusComponent } from './manage-aboutus/manage-aboutus.component';
import { ManageContactusComponent } from './manage-contactus/manage-contactus.component';
import { ManageTestimonialsComponent } from './manage-testimonials/manage-testimonials.component';
import { HomeComponent } from './home/home.component';
import { AdminSharedModule } from './admin-shared/admin-shared.module';
import { ReportComponent } from './report/report.component';
import { AirlinesComponent } from './airlines/airlines.component';
import { CreateAirportComponent } from './create-airport/create-airport.component';




@NgModule({
  declarations: [
    AirportsComponent,
    FlightsComponent,
    UsersComponent,
    SearchFlightComponent,
    ViewProfileComponent,
    UpdateProfileComponent,
    ManageHomeComponent,
    ManageAboutusComponent,
    ManageContactusComponent,
    ManageTestimonialsComponent,
    HomeComponent,
    ReportComponent,
    AirlinesComponent,
    CreateAirportComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminSharedModule
    
]
})
export class AdminModule { }
