import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public home: HomeService, private router: Router) { }


  ngOnInit(): void {
    this.home.getAllTestimonials()

    this.home.getHomePage()
    this.home.getContactInfo()
  }



  // Sample data for cities
  cities: string[] = ['Amman', 'Irbid', 'Jarash', 'Peru', 'Japan', 'Thailand', 'Brazil', 'United States', 'China', 'Russia'];
  filteredDepartureCities: string[] = []; // Stores filtered results for departure
  filteredDestinationCities: string[] = []; // Stores filtered results for destination
  selectedDepartureCity: string = ''; // Stores the selected departure city
  selectedDestinationCity: string = ''; // Stores the selected destination city

  // Method to filter departure cities based on user input
  filterDepartureOptions(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value; // Extract the value from the input

    if (searchTerm) {
      this.filteredDepartureCities = this.cities.filter(city =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredDepartureCities = []; // Reset if no input
    }

    console.log('Search Term (Departure):', searchTerm); // Log the current search term
    console.log('Filtered Departure Cities:', this.filteredDepartureCities); // Log the filtered cities
  }

  // Method to filter destination cities based on user input
  filterDestinationOptions(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value; // Extract the value from the input

    if (searchTerm) {
      this.filteredDestinationCities = this.cities.filter(city =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredDestinationCities = []; // Reset if no input
    }

    console.log('Search Term (Destination):', searchTerm); // Log the current search term
    console.log('Filtered Destination Cities:', this.filteredDestinationCities); // Log the filtered cities
  }

  // Method to handle departure city selection
  selectDepartureCity(city: string) {
    this.selectedDepartureCity = city; // Update selected departure city
    this.filteredDepartureCities = []; // Clear filtered results after selection
    console.log('Selected Departure City:', this.selectedDepartureCity); // Log the selected city
  }

  // Method to handle destination city selection
  selectDestinationCity(city: string) {
    this.selectedDestinationCity = city; // Update selected destination city
    this.filteredDestinationCities = []; // Clear filtered results after selection
    console.log('Selected Destination City:', this.selectedDestinationCity); // Log the selected city
  }










  Logout() {
    this.router.navigate(['security/login'])
    localStorage.clear()
  }



}
