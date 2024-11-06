import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.flights = history.state.flights;
    let user: any = localStorage.getItem('user')
    user = JSON.parse(user)
    this.userId = user.userid;
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
  
}
