import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FlightService } from 'src/app/Services/flight.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']

})

export class FlightsComponent implements OnInit {
  cities: { cityname: string, id: number }[] = [];  // Store city names and their IDs
  filteredDepartureCities: { cityname: string, id: number }[] = []; // Filtered departure cities
  filteredDestinationCities: { cityname: string, id: number }[] = []; // Filtered destination cities
  selectedDepartureCity: string = ''; // Display selected departure city name
  selectedDestinationCity: string = ''; // Display selected destination city name
  flights: any[] = []; // Ensure this is typed as any[] to store flight data

  constructor(private flight: FlightService) {}

  ngOnInit() {
    this.loadCities();
  }

  // Load cities with their names and IDs
  loadCities() {
    this.flight.GetAllCiies().subscribe(
      (res: any[]) => {
        this.cities = res.map(cityObj => ({
          cityname: cityObj.cityname,
          id: cityObj.id
        }));
      },
      (err: any) => {
        console.error('Error loading cities:', err);
      }
    );
  }

  // Filter departure city options based on user input
  filterDepartureOptions(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value.toLowerCase();

    this.filteredDepartureCities = this.cities.filter(city =>
      city.cityname.toLowerCase().includes(searchTerm)
    );
  }

  // Filter destination city options based on user input
  filterDestinationOptions(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value.toLowerCase();

    this.filteredDestinationCities = this.cities.filter(city =>
      city.cityname.toLowerCase().includes(searchTerm)
    );
  }

  // Form for search input
  searchForm: FormGroup = new FormGroup({
    departuredate: new FormControl(),
    departurePlaceId: new FormControl(),
    destenationPlaceId: new FormControl(),
    degreenameId: new FormControl()
  });

  // Search button handler
  SearchInput() {
    console.log('Search initiated with form data:', this.searchForm.value);
    this.flight.SearchForFlight(this.searchForm.value).subscribe(
      (res: any) => {
        this.flights = res; // Assuming the response is an array of flights
        console.log('Search results:', this.flights);
      },
      (err: any) => {
        console.error('Error occurred during search:', err);
      }
    );
  }

  // Handle departure city selection and store its ID in the form
  selectDepartureCity(city: { cityname: string, id: number }) {
    this.selectedDepartureCity = city.cityname;  // Display the city name
    this.searchForm.controls['departurePlaceId'].setValue(city.id);  // Store the city ID
    this.filteredDepartureCities = [];  // Clear the dropdown
  }

  // Handle destination city selection and store its ID in the form
  selectDestinationCity(city: { cityname: string, id: number }) {
    this.selectedDestinationCity = city.cityname;  // Display the city name
    this.searchForm.controls['destenationPlaceId'].setValue(city.id);  // Store the city ID
    this.filteredDestinationCities = [];  // Clear the dropdown
  }
}


