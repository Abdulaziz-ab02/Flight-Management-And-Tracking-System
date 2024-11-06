import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as L from 'leaflet';
import { FlightService } from 'src/app/Services/flight.service';

@Component({
  selector: 'app-flight-tracker',
  templateUrl: './flight-tracker.component.html',
  styleUrls: ['./flight-tracker.component.css']
})
export class FlightTrackerComponent implements OnInit {
  map: any;
  airplaneMarker: any;
  currentPosition?: [number, number];
  animationInterval: any;
  flightData: any[] = [];
  flightId: any;
  departure: [number, number] = [0, 0];
  destination: [number, number] = [0, 0];
  flightPath: any;

  constructor(private flightService: FlightService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  searchFlight(): void {
    this.flightService.FetchFlightByFlightID(this.flightId).subscribe(
      (res) => {
        this.flightData = res;
        console.log('Flight found :)', this.flightData);

        if (this.flightData.length > 0) {
          this.departure = [this.flightData[0].departureLatitude, this.flightData[0].departureLongitude];
          this.destination = [this.flightData[0].destinationLatitude, this.flightData[0].destinationLongitude];
          
          this.cdr.detectChanges();
          this.initializeMap();
          this.startFlightAnimation();
        }
      },
      (error) => {
        console.log('Error while trying to fetch the flight data :(');
      }
    );
  }

  initializeMap(): void {
    if (this.map) {
      this.map.remove();
    }
    this.map = L.map('map').setView(this.departure, 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    const airplaneIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/png/2708.png',
      iconSize: [50, 50],
      iconAnchor: [25, 25],
    });

    this.airplaneMarker = L.marker(this.departure, { icon: airplaneIcon }).addTo(this.map);

    this.flightPath = L.polyline([this.departure, this.destination], {
      color: 'blue',
      weight: 4,
      opacity: 0.7,
      dashArray: '5, 10',
    }).addTo(this.map);
  }

  startFlightAnimation(): void {
    let step = 0;
    const totalSteps = 1000;
    const intervalTime = 1000;

    const latStep = (this.destination[0] - this.departure[0]) / totalSteps;
    const lngStep = (this.destination[1] - this.departure[1]) / totalSteps;

    this.animationInterval = setInterval(() => {
      if (step < totalSteps) {
        const newLat = this.departure[0] + latStep * step;
        const newLng = this.departure[1] + lngStep * step;
        this.currentPosition = [newLat, newLng];

        this.airplaneMarker.setLatLng(this.currentPosition);
        this.map.panTo(this.currentPosition);

        step++;
      } else {
        clearInterval(this.animationInterval);
      }
    }, intervalTime);
  }
}
