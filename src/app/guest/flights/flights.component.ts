import { Component, OnInit, TemplateRef, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog and MAT_DIALOG_DATA


@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']

})


export class FlightsComponent implements OnInit {
  @ViewChild('FLightSelectionDialog') flightSelctionDialog !: TemplateRef<any>;

constructor(private router: Router, public dialog:MatDialog){}
flights : any[] =[];
selectedFlight: any = {}; // Store the selected flight
numOfPassengers: number = 0;
totalPrice:number =0;

ngOnInit(): void {
 this.flights = history.state.flights;
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
  this.dialog.open(this.flightSelctionDialog, {
    data : {
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


 
  



}


