import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightService } from 'src/app/Services/flight.service';

interface Flight {
  id?: number; // Optional, for new flights that don't have an ID yet
  flightNumber: string;
  capacity: number;
  pricePerPassenger: number;
  departureDate: string;
  destinationDate: string;
  status: string;
  discountValue?: number; // Optional discount
  departureAirportId: number;
  destinationAirportId: number;
  degreeId: number;
}

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  flights: Flight[] = [];
  airlineId!: number;
  createFlightForm: FormGroup;
  showCreateForm: boolean = false;
  editingFlightId: number | null = null;
  airports: any;
  
  // Static array for degrees
  degrees = [
    { id: 1, name: 'Economy' },
    { id: 2, name: 'Business' },
    { id: 3, name: 'First Class' }
  ];

  constructor(private flightService: FlightService) {
    this.createFlightForm = new FormGroup({
      flightNumber: new FormControl('', Validators.required),
      capacity: new FormControl('', [Validators.required, Validators.min(1)]),
      pricePerPassenger: new FormControl('', [Validators.required, Validators.min(0)]),
      departureDate: new FormControl('', Validators.required),
      destinationDate: new FormControl('', Validators.required),
      status: new FormControl('Scheduled', Validators.required),
      discountValue: new FormControl(0), // Changed to match naming convention
      departureAirportId: new FormControl('', Validators.required),
      destinationAirportId: new FormControl('', Validators.required),
      degreeId: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.airlineId = user.airlineid;
    this.fetchFlights();
    this.fetchAirports();
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

  fetchAirports(): void {
    this.flightService.FetchAllAirports().subscribe(
      (data) => {
        this.airports = data;
      },
      (error) => {
        console.error('Error fetching airports:', error);
      }
    );
  }

  createFlight(): void {
    if (this.createFlightForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const flightData: Flight = { ...this.createFlightForm.value, airlineId: this.airlineId };

    if (this.editingFlightId) {
      const updatedFlight: Flight = { id: this.editingFlightId, ...flightData };
      this.updateFlight(updatedFlight);
    } else {
      this.flightService.CreateFlight(flightData).subscribe(
        (response) => {
          console.log('Flight created successfully:', response);
          this.fetchFlights();
          this.createFlightForm.reset();
          this.showCreateForm = false;
        },
        (error) => {
          console.error('Error creating flight:', error);
        }
      );
    }
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    this.createFlightForm.reset();
    this.editingFlightId = null;
  }

  editFlight(flight: Flight): void {
    this.editingFlightId = flight.id || null;
    this.showCreateForm = true;
    this.createFlightForm.patchValue(flight);
  }

  updateFlight(updatedFlight: Flight): void {
    this.flightService.UpdateFlight(updatedFlight).subscribe(
      (response) => {
        console.log('Flight updated successfully:', response);
        this.fetchFlights();
        this.createFlightForm.reset();
        this.editingFlightId = null;
        this.showCreateForm = false;
      },
      (error) => {
        console.error('Error updating flight:', error);
      }
    );
  }

  deleteFlight(flightId: number): void {
    this.flightService.DeleteFlight(flightId).subscribe(
      (response) => {
        console.log('Flight deleted successfully:', response);
        this.fetchFlights();
      },
      (error) => {
        console.error('Error deleting flight:', error);
      }
    );
  }
}
