import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-flight-tracker',
  templateUrl: './flight-tracker.component.html',
  styleUrls: ['./flight-tracker.component.css']
})
export class FlightTrackerComponent implements OnInit {
  map: any;
  airplaneMarker: any;
  departure: [number, number] = [40.7128, -74.0060]; // Example: New York (latitude, longitude)
  destination: [number, number] = [34.0522, -118.2437]; // Example: Los Angeles (latitude, longitude)
  currentPosition?: [number, number];
  animationInterval: any;

  ngOnInit(): void {
    this.initializeMap();
    this.startFlightAnimation();
  }

  initializeMap(): void {
    this.map = L.map('map').setView(this.departure, 5); // Initial zoom level 5

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Airplane icon from Cloudflare
    const airplaneIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/png/2708.png', // Airplane emoji icon from Cloudflare
      iconSize: [50, 50],
      iconAnchor: [25, 25],
    });

    // Add airplane marker to the map
    this.airplaneMarker = L.marker(this.departure, { icon: airplaneIcon }).addTo(this.map);
  }

  startFlightAnimation(): void {
    let step = 0;
    const totalSteps = 1000; // Controls the smoothness of the animation
    const intervalTime = 1000; // Time in ms between steps

    // Calculate incremental steps for latitude and longitude
    const latStep = (this.destination[0] - this.departure[0]) / totalSteps;
    const lngStep = (this.destination[1] - this.departure[1]) / totalSteps;

    this.animationInterval = setInterval(() => {
      if (step < totalSteps) {
        const newLat = this.departure[0] + latStep * step;
        const newLng = this.departure[1] + lngStep * step;
        this.currentPosition = [newLat, newLng];
        
        // Update airplane position
        this.airplaneMarker.setLatLng(this.currentPosition);
        
        // Center map on airplane's current position
        this.map.panTo(this.currentPosition);
        
        step++;
      } else {
        clearInterval(this.animationInterval); // Stop animation when it reaches the destination
      }
    }, intervalTime);
  }
}
