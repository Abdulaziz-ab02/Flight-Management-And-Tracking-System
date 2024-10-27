import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']

})

export class FlightsComponent implements OnInit {
constructor(private router: Router){}
flights : any[] =[];
ngOnInit(): void {
 this.flights = history.state.flights;

}
  handleFlightsFound(flights: any[]) {
    this.flights = flights;
  }
  homeFlights(homeFlights: any[]){
    this.flights = homeFlights;
  } 
  



}


