import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as ApexCharts from 'apexcharts';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  chart: any;
  constructor(public admin: AdminService) {}

  searchForm: FormGroup = new FormGroup({
    dateFrom: new FormControl(null),
    dateTo: new FormControl(null),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    flightnumber: new FormControl('')
  });

  ngOnInit(): void {

    this.createChart();

    this.admin.FetchAllReservations();
  }
  createChart() {
    const options = {
      chart: {
        type: 'bar', // Change to 'bar' for a column chart
        height: 350,
        toolbar: {
          show: false // Optional: hide the toolbar
        }
      },
      series: [{
        name: 'Benefits',
        data: [30, 40, 45, 50, 49, 60, 70] // Sample data
      }],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Sample categories
        title: {
          text: 'Months', // Optional: add title to the x-axis
        }
      },
      title: {
        text: 'Monthly Benefits', // Optional: add a chart title
        align: 'center' // Optional: center the title
      },
      yaxis: {
        title: {
          text: 'Amount', // Optional: add title to the y-axis
        }
      },
      plotOptions: {
        bar: {
          horizontal: false, // Set to true for horizontal bars
        }
      }
    };
  
    this.chart = new ApexCharts(document.querySelector("#chart"), options);
    this.chart.render(); // Ensure to call render() to display the chart
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