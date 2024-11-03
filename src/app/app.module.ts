import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminSharedModule } from './admin/admin-shared/admin-shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuestSharedModule } from './guest/guest-shared/guest-shared.module';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GuestSharedModule,
    AdminSharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
