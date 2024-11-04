import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightService } from 'src/app/Services/flight.service';

export interface Flight {
  id: number;
  flightNumber: string;
  capacity: number;
  pricePerPassenger: number;
  departureDate: Date;
  destinationDate: Date;
  status: string;
  discountValue: number;
  airlineName: string;
  departureAirportName: string;
  destinationAirportName: string;
  departureairportid: number;
  destinationairportid: number;
  degreeid: number;
  
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
airport: any;

  constructor(private flightService: FlightService) {
    this.createFlightForm = new FormGroup({
      flightNumber: new FormControl('', Validators.required),
      capacity: new FormControl('', [Validators.required, Validators.min(1)]),
      pricePerPassenger: new FormControl('', [Validators.required, Validators.min(0)]),
      departureDate: new FormControl('', Validators.required),
      destinationDate: new FormControl('', Validators.required),
      status: new FormControl('Scheduled', Validators.required), // Default status set to "Scheduled"
      discountvalue: new FormControl(0),
      departureairportid: new FormControl('', Validators.required),
      destinationairportid: new FormControl('', Validators.required),
      degreeid: new FormControl(''),
    });
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.airlineId = user.airlineid;
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
    this.createFlightForm.controls['status'].setValue('Scheduled'); 
    this.editingFlightId = null;
  }

  editFlight(flight: Flight): void {
    this.editingFlightId = flight.id || null;
    this.showCreateForm = true;
    this.createFlightForm.patchValue({
      flightNumber: flight.flightNumber,
      capacity: flight.capacity,
      pricePerPassenger: flight.pricePerPassenger,
      departureDate: flight.departureDate,
      destinationDate: flight.destinationDate,
      status: flight.status,
      discountvalue: flight.discountValue,
      departureairportid: flight.departureairportid,
      destinationairportid: flight.destinationairportid,
      degreeid: flight.degreeid,
    });
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
