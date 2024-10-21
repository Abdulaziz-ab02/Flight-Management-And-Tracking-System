import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FlightService } from 'src/app/Services/flight.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html'
})
export class FlightsComponent implements OnInit {
  cities: string[] = [];  // Initialize the cities array
  filteredDepartureCities: string[] = []; // Stores filtered results for departure
  filteredDestinationCities: string[] = []; // Stores filtered results for destination
  selectedDepartureCity: string = ''; // Stores the selected departure city
  selectedDestinationCity: string = ''; // Stores the selected destination city

  constructor(private flight: FlightService) {} // Inject the service

  ngOnInit() {
    this.loadCities(); 
  }
  //يا عفو ربنا شو هذا
  loadCities() {
    this.flight.GetAllCiies().subscribe(
      (res: any[]) => {
        this.cities = res.map(cityObj => cityObj.cityname); 
        console.log('Cities loaded:', this.cities);
      },
      (err: any) => {
        console.error('Error loading cities:', err);
      }
    );
  }

  filterDepartureOptions(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value;

    if (searchTerm) {
      this.filteredDepartureCities = this.cities.filter(city =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredDepartureCities = [];
    }
  }

  // Method to filter destination cities based on user input
  filterDestinationOptions(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value;

    if (searchTerm) {
      this.filteredDestinationCities = this.cities.filter(city =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredDestinationCities = [];
    }
  }

  // Method to handle departure city selection
  selectDepartureCity(city: string) {
    this.selectedDepartureCity = city;
    this.filteredDepartureCities = [];
  }

  // Method to handle destination city selection
  selectDestinationCity(city: string) {
    this.selectedDestinationCity = city;
    this.filteredDestinationCities = [];
  }
  searchForm: FormGroup = new FormGroup({
    departuredate: new FormControl(),
    departurePlaceId: new FormControl(),
    destenationPlaceId: new FormControl(),
    degreenameId: new FormControl()
  });
}
