import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
 
  constructor(public admin: AdminService) {}

  searchForm: FormGroup = new FormGroup({
    dateFrom: new FormControl(null),
    dateTo: new FormControl(null),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    flightnumber: new FormControl('')
  });

  ngOnInit(): void {



    this.admin.FetchAllReservations();
  }


  onSearch(): void {
    const formData = this.searchForm.value;

    // Call the search service method and update reservations with the search results
    this.admin.SearchReservations(formData).subscribe(
      (results) => {
        this.admin.reservations = results;
      },
      (error) => {
        console.error("Error fetching reservations:", error);
      }
    );
  }

  

  
}