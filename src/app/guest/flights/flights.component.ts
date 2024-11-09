import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FlightService } from 'src/app/Services/flight.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  @ViewChild('FLightSelectionDialog') flightSelctionDialog!: TemplateRef<any>;
  private dialogRef!: MatDialogRef<any>; // Add a reference to the opened dialog

  flights: any[] = [];
  selectedFlight: any = {}; // Store the selected flight
  numOfPassengers: number = 0;
  totalPrice: number = 0;
  userId?: number;

  constructor(private router: Router, public dialog: MatDialog , public flightservice: FlightService) {}

  ngOnInit(): void {
    this.flights = history.state.flights;
    this.filteredFlights = [...this.flights]; // Start with all flights
    this.numOfPassengers = history.state.passengerCount;
    let user: any = localStorage.getItem('user')
    user = JSON.parse(user)
    this.userId = user.userid;
    this.loadAirlines();

  
  }

  private calculateTotalPrice() {
    console.log('numOfPassengers: ', this.numOfPassengers);
    
    if (this.numOfPassengers >= 1) {
      this.totalPrice = this.selectedFlight.price * (this.numOfPassengers + 1);
    } else {
      this.totalPrice = this.selectedFlight.price;
    }
  }

  OpenFlightSelectionDialog(flight: any) {
    this.selectedFlight = flight;
    this.calculateTotalPrice();

    // Store the dialog reference
    this.dialogRef = this.dialog.open(this.flightSelctionDialog, {
      data: {
        flight: this.selectedFlight,
        numberOfPassenger: this.numOfPassengers,
        TotalPrice: this.totalPrice
      }
    });
  }

  handleFlightsFound(eventData: { flights: any[], passengerCount: number }) { 
    const { flights, passengerCount } = eventData;
    this.flights = flights;
    this.numOfPassengers = passengerCount;
  }

  processToPayFunc() {
   if(this.userId){
    this.router.navigate(['/user/reservations'], {
      state: {
        selectedFlight: this.selectedFlight,
        numOfPassengers: this.numOfPassengers,
        TotalPrice: this.totalPrice
      }
    }).then(() => {
      if (this.dialogRef) {
        this.dialogRef.close(); // Close the dialog
      }
    });
   }
   else{
    this.router.navigate(['/security/login']).then(() => {
      if (this.dialogRef) {
        this.dialogRef.close(); // Close the dialog
      }
    });
   }
  
  }





  //filtering 
airlines: any[] = [];
selectedPriceRange: number =100; // Default price range selection
selectedAirlines: string[] = [];  // To store selected airlines
filteredFlights: any[] = []; 



public loadAirlines(): void {
  this.flightservice.getAllAirlines().subscribe(
    (data: any[]) => {
      this.airlines = data;
    },
    error => {
      console.error('Error fetching airlines:', error);
    }
  );
}





applyFilters(): void {
  this.filteredFlights = this.flights.filter(flight => {
    const meetsPriceCondition = flight.price <= this.selectedPriceRange;
    const meetsAirlineCondition = this.selectedAirlines.length === 0 || this.selectedAirlines.includes(flight.airlinename);

    return meetsPriceCondition && meetsAirlineCondition;
  });
}
  



toggleAirlineFilter(airline: string, event: any): void {
  if (event.target.checked) {
    this.selectedAirlines.push(airline);
  } else {
    this.selectedAirlines = this.selectedAirlines.filter(a => a !== airline);
  }
  this.applyFilters(); // Apply filters after selection change
}



}
