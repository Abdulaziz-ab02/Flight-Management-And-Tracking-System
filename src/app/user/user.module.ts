import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { FormsModule } from '@angular/forms';
import { GuestSharedModule } from '../guest/guest-shared/guest-shared.module';
import { ProfileComponent } from './profile/profile.component';
import { ReservationsComponent } from './reservations/reservations.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ReservationsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    GuestSharedModule,
    FormsModule
  ]
})
export class UserModule { }
