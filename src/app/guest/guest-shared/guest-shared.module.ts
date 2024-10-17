import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatButtonModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    HttpClientModule,
    MatButtonModule
  ]
})
export class GuestSharedModule { }
