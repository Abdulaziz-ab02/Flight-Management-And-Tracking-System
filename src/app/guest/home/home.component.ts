import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/Services/home.service';
import { FlightsComponent } from '../flights/flights.component';
import { state } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeFlights: any[] = [];

  constructor(public home: HomeService, private router: Router) { }


  filteredTestimonials: any[] = [];

  ngOnInit(): void {
    this.home.getAllTestimonials()

    this.home.getHomePage()
    this.home.getContactInfo()
  }

  handleHomeFlights(flights: any[]) {
    this.router.navigate(['/flights'], { state: { flights } });
  }
  




  





}
