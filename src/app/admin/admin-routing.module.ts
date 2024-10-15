import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { FlightsComponent } from './flights/flights.component';
import { AirportsComponent } from './airports/airports.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { ManageAboutusComponent } from './manage-aboutus/manage-aboutus.component';
import { ManageContactusComponent } from './manage-contactus/manage-contactus.component';
import { ManageTestimonialsComponent } from './manage-testimonials/manage-testimonials.component';

const routes: Routes = [

  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path: 'users',
    component:UsersComponent
  },
  {
    path: 'flights',
    component: FlightsComponent
  },
  {
    path: 'airports',
    component: AirportsComponent
  },
  {
    path: 'search',
    component:SearchFlightComponent 
  },
  {
    path: 'updateprofile',
    component:UpdateProfileComponent 
  },
  {
    path: 'viewprofile',
    component: ViewProfileComponent
  } ,
   {
    path: 'managehome',
    component: ManageHomeComponent
  },
  {
    path: 'manageabout',
    component:ManageAboutusComponent 
  },
  {
    path: 'managecontact',
    component:ManageContactusComponent
  },
  {
    path: 'managetestimonial',
    component: ManageTestimonialsComponent
  }










];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
