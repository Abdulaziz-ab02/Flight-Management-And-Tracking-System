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
        this.admin.reservations = results;
      },
      (error) => {
        console.error("Error fetching reservations:", error);
      }
    );

    // // Fetch benefit data for the specified period and update the chart
    // this.admin.FetchBenefitsReport(formData.dateFrom, formData.dateTo).subscribe(
    //   (benefitData) => {
    //     this.admin.benefits = benefitData;
        
    //     // Calculate total benefits
    //     this.totalBenefits = this.admin.benefits.reduce((sum: any, benefit: { amount: any; }) => sum + benefit.amount, 0);
        
    //     // If benefits data exists, create or update the line chart
    //     if (benefitData && benefitData.length > 0) {
    //       this.createLineChart(benefitData);
    //     } else {
    //       console.error('No benefit data found for the selected period.');
    //     }
    //   },
    //   (error) => {
    //     console.error("Error fetching benefit report:", error);
    //   }
    // );
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
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.admin.reservations);
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

      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: 110 // Position table below the chart
      });

      doc.save('Reservations_Report.pdf');
    });
  }

}
