import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserSharedModule } from './user/user-shared/user-shared.module';
import { AdminSharedModule } from './admin/admin-shared/admin-shared.module';

@NgModule({
  declarations : [
  AppComponent
],
imports : [
BrowserModule,
AppRoutingModule,
UserSharedModule,
AdminSharedModule
],
providers: [],
bootstrap: [AppComponent] 
})
export class AppModule { }
