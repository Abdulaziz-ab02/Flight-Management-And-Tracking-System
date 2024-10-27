import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public home: HomeService, private router: Router, public dialog: MatDialog) { }

  @ViewChild('callCreateDailog') createDialog !: TemplateRef<any>;

  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.home.getAllTestimonials()

    this.home.getHomePage()
    this.home.getContactInfo()

    const token = localStorage.getItem('token');
    //if the user is loggen in 
    if (token) {
      this.isLoggedIn = true;
    }

  }

  createTestimonial: FormGroup = new FormGroup({
    testimonialcontent: new FormControl('', Validators.required),
    rating: new FormControl('', [Validators.min(1), Validators.max(5)]),
    testimonialdate: new FormControl(),
    testimonialstatus: new FormControl(),
    userid: new FormControl()
  })

  openCreateDialog() {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date
    this.createTestimonial.controls['testimonialdate'].setValue(currentDate);

    let user: any = localStorage.getItem('user')
    user = JSON.parse(user)
    this.createTestimonial.controls['userid'].setValue(user.userid)
    this.createTestimonial.controls['testimonialstatus'].setValue('Pending')


    console.log('Testimonial Date:', this.createTestimonial.controls['testimonialdate'].value);
    console.log('User ID:', this.createTestimonial.controls['userid'].value);
    console.log('Testimonial Status:', this.createTestimonial.controls['testimonialstatus'].value);


    this.dialog.open(this.createDialog)
  }

  save() {
    this.home.CreateTestimonial(this.createTestimonial.value)
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






}
