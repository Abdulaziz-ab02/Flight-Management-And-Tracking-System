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
  @Output() flightsFound = new EventEmitter<{ flights: any[], passengerCount: number }>();
  cities: { cityname: string, id: number }[] = [];  
  filteredDepartureCities: { cityname: string, id: number }[] = []; 
  filteredDestinationCities: { cityname: string, id: number }[] = []; 
  selectedDepartureCity: string = ''; 
  selectedDestinationCity: string = ''; 
  flights: any[] = []; 
  Facilites: any[] = [];
  passengerCount: number = 0;

  constructor(private flight: FlightService, private router: Router, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit() {
    this.loadCities(); 
  }

  onPassengerChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.passengerCount = +selectElement.value;
    console.log('Selected passenger count:', this.passengerCount);
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
    console.log('Fetching facilities for degree ID:', id);
    this.flight.GetAllFacilitesByDegree(id).subscribe(
      (res: any[]) => {
        this.Facilites = res.map((facility: any) => ({
          facilityname: facility.facilityname
        }));
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
        this.flights = res;
        console.log('Search results:', this.flights);
  
        this.flights.forEach((flight) => {
          this.flight.GetAllFacilitesByDegree(flight.degreeId).subscribe(
            (facilities: any[]) => {
              flight.facilities = facilities.map(facility => ({
                facilityname: facility.facilityname
              }));
              this.flightsFound.emit({ flights: this.flights, passengerCount: this.passengerCount });
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
    this.selectedDepartureCity = city.cityname;
    this.searchForm.controls['departurePlaceId'].setValue(city.id);
    this.filteredDepartureCities = [];
  }

  selectDestinationCity(city: { cityname: string, id: number }) {
    this.selectedDestinationCity = city.cityname;
    this.searchForm.controls['destenationPlaceId'].setValue(city.id);
    this.filteredDestinationCities = [];
  }
}
