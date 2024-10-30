import { Component,OnInit } from '@angular/core'
import { FlightService } from 'src/app/Services/flight.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  flights: FlightsComponent[] = [];
  airlineId: number = 1;

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.fetchFlights();
  }

  fetchFlights(): void {
    this.flightService.GetAllFlightsByAirlineID(this.airlineId).subscribe(
      (data) => {
        this.flights = data;
      },
      (error) => {
        console.error('Error fetching flights:', error);
      }
    );
  }

}
export interface FlightsComponent {
  id: number;
  flightNumber: string;
  capacity: number;
  pricePerPassenger: number;
  departureDate: Date;
  destinationDate: Date;
  status: string;
  discountValue: number;
  airlineName: string;
  airlineImage: string;
  departureAirportName: string;
  departureIATACode: string;
  destinationAirportName: string;
  destinationIATACode: string;
  degreeName: string;
}

