import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


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

 
  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.admin.reservations);
    const workbook: XLSX.WorkBook = { Sheets: { 'Reservations': worksheet }, SheetNames: ['Reservations'] };
    XLSX.writeFile(workbook, 'Reservations_Report.xlsx');
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    const columns = ['Reservation Date', 'First Name', 'Last Name', 'Flight Number', 'Departure Date', 'Destination Date', 'Number of Passengers', 'Total Price'];
    const rows = this.admin.reservations.map((reservation: any) => [
      reservation.reservationdate,
      reservation.firstname,
      reservation.lastname,
      reservation.flightnumber,
      reservation.departuredate,
      reservation.destinationdate,
      reservation.numofpassengers,
      reservation.totalprice,
    ]);
  
    doc.text('Reservations Report', 14, 10);
    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });
    doc.save('Reservations_Report.pdf');
  }
  
  

  
}