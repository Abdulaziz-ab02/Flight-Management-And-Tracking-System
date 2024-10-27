import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from 'src/app/Services/flight.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  @Output() flightsFound = new EventEmitter<any[]>();

  cities: { cityname: string, id: number }[] = [];  // Store city names and their IDs
  filteredDepartureCities: { cityname: string, id: number }[] = []; // Filtered departure cities
  filteredDestinationCities: { cityname: string, id: number }[] = []; // Filtered destination cities
  selectedDepartureCity: string = ''; // Display selected departure city name
  selectedDestinationCity: string = ''; // Display selected destination city name
  flights: any[] = []; // Ensure this is typed as any[] to store flight data
  Facilites: any[] = [];

  constructor(private flight: FlightService,private router: Router,
    private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.loadCities(); 
  }
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
  GetAllFacilitesByDegreeId(id: number) {
    console.log('Fetching facilities for degree ID:', id);  // Log the ID for debugging
    this.flight.GetAllFacilitesByDegree(id).subscribe(
      (res: any[]) => {
        console.log('API response:', res);  // Log the response for debugging
        this.Facilites = res.map((facility: any) => ({
          facilityname: facility.facilityname
        }));
        console.log('Mapped facilities:', this.Facilites);
      },
      (err: any) => {
        console.error('Error fetching facilities:', err);
      }
    );
  }
  filterDepartureOptions(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value.toLowerCase();

    this.filteredDepartureCities = this.cities.filter(city =>
      city.cityname.toLowerCase().includes(searchTerm)
    );
  }
  filterDestinationOptions(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value.toLowerCase();

    this.filteredDestinationCities = this.cities.filter(city =>
      city.cityname.toLowerCase().includes(searchTerm)
    );
  }
  searchForm: FormGroup = new FormGroup({
    departuredate: new FormControl(),
    departurePlaceId: new FormControl(),
    destenationPlaceId: new FormControl(),
    degreenameId: new FormControl()
  });
  SearchInput() {
    console.log('Search initiated with form data:', this.searchForm.value);
    this.flight.SearchForFlight(this.searchForm.value).subscribe(
      (res: any[]) => {
        this.flights = res; // Assuming the response is an array of flights
        this.flightsFound.emit(this.flights);

        console.log('Search results:', this.flights);
  
        // Fetch facilities for each flight
        this.flights.forEach((flight) => {
          this.flight.GetAllFacilitesByDegree(flight.degreeId).subscribe(
            (facilities: any[]) => {
              flight.facilities = facilities.map(facility => ({
                facilityname: facility.facilityname
              }));
              console.log(`Facilities for flight ${flight.id}:`, flight.facilities);
            },
            (err: any) => {
              console.error('Error fetching facilities:', err);
            }
          );
        });
      },
      (err: any) => {
        console.error('Error occurred during search:', err);
      }
    );

    
  }
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
