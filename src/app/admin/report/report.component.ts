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
  chart: any; // Store the chart instance
  totalBenefits: number = 0; // Variable to store total benefits
  afterSearch:any[] = [];
  constructor(public admin: AdminService) {}

  searchForm: FormGroup = new FormGroup({
    dateFrom: new FormControl(null),
    dateTo: new FormControl(null),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    flightnumber: new FormControl('') 
  });

  ngOnInit(): void {
    // Initialize data fetching when the component is loaded
    this.admin.FetchAllReservations();

    this.loadChartData();
  }


  loadChartData(): void {
    this.admin.getEntityCounts().subscribe(
      (counts) => {
        this.createChart(counts);
      },
      (error) => {
        console.error('Error fetching entity counts:', error);
      }
    );
  }
  // Fetch data and create chart when search form is submitted
  onSearch(): void {
    const formData = this.searchForm.value;
  
    // Fetch reservations based on the search form data
    this.admin.SearchReservations(formData).subscribe(
      (results) => {
        this.afterSearch = results;
        
        // Reset totalBenefits before calculating
        this.totalBenefits = 0;
  
        // Use forEach loop to accumulate totalPrice values
        this.afterSearch.forEach((obj: any) => {
          
            this.totalBenefits += obj.totalprice;
          
        });
      },
      (error) => {
        console.error("Error fetching reservations:", error);
      }
    );
  }

  createChart(counts: any): void {
    const options = {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false
        }
      },
      series: [{
        name: 'Count',
        data: [
          counts.reservations,
          counts.airports,
          counts.users,
          counts.airlines
        ]
      }],
      xaxis: {
        categories: ['Reservations', 'Airports', 'Users', 'Airlines'],
        title: {
          text: 'Entities'
        }
      },
      title: {
        text: 'Entity Counts',
        align: 'center'
      },
      yaxis: {
        title: {
          text: 'Count'
        }
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      }
    };

    this.chart = new ApexCharts(document.querySelector('#chart'), options);
    this.chart.render();
  }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.afterSearch);
  
    // Add a row for total benefits at the end of the sheet
    const totalRow = [
      { ReservationDate: 'Total Benefits', TotalPrice: this.totalBenefits }
    ];
    
    // Append the totalRow to the existing data in the worksheet
    XLSX.utils.sheet_add_json(worksheet, totalRow, { origin: -1 }); // -1 appends to the end
    
    const workbook: XLSX.WorkBook = { Sheets: { 'Reservations': worksheet }, SheetNames: ['Reservations'] };
    XLSX.writeFile(workbook, 'Reservations_Report.xlsx');
  }
  
  
  

  exportToPDF(): void {
    this.chart.dataURI().then((uri: { imgURI: string }) => {
      const doc = new jsPDF();
  
      // Add the chart image to the PDF
      doc.text('Reservations Report', 14, 10);
      doc.addImage(uri.imgURI, 'PNG', 10, 20, 180, 80);
  
      // Add table content
      const columns = ['Reservation Date', 'First Name', 'Last Name', 'Flight Number', 'Departure Date', 'Destination Date', 'Number of Passengers', 'Total Price'];
      const rows = this.afterSearch.map((reservation: any) => [
        reservation.reservationdate,
        reservation.firstname,
        reservation.lastname,
        reservation.flightnumber,
        reservation.departuredate,
        reservation.destinationdate,
        reservation.numofpassengers,
        reservation.totalprice,
      ]);
  
      // Add a row for total benefits
      rows.push(['', '', '', '', '', '', 'Total Benefits', this.totalBenefits]);
  
      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: 110 // Position table below the chart
      });
  
      doc.save('Reservations_Report.pdf');
    });
  }
  
  

}
