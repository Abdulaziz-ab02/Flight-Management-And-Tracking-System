import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  searchForm: FormGroup;

  constructor(public admin: AdminService) {
    this.searchForm = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      flightNumber: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.admin.FetchAllReservations();
  }

  onSearch() {
    const searchValues = this.searchForm.value;

    // Prepare a filter object for the search
    const filter: any = {
        fName: searchValues.firstName || null,
        lName: searchValues.lastName || null,
        flightNum: searchValues.flightNumber || null,
        DateFrom: searchValues.startDate ? new Date(searchValues.startDate) : null,
        DateTo: searchValues.endDate ? new Date(searchValues.endDate) : null,
    };

    console.log('Filter Values:', filter); // Log the filter values

    this.admin.SearchReservations(filter).subscribe(
      data => {
          console.log('Search Results:', data); // Check if any data is returned
          if (data.length === 0) {
              console.warn('No results found with the given filters.');
          }
          this.admin.reservations = data; 
      },
      error => {
          console.error('Error fetching reservations:', error); 
      }
  );
  
}

  

  
}