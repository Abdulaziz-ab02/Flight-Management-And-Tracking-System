import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FlightService } from 'src/app/Services/flight.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']

})

export class FlightsComponent  {

  flights: any[] = []; // Ensure this is typed as any[] to store flight data
  Facilites: any[] = [];
  handleFlightsFound(flights: any[]) {
    this.flights = flights;
  }

  constructor(private flight: FlightService) {}


}


