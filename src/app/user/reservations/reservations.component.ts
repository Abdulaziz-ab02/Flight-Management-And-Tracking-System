import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BankService } from 'src/app/Services/bank.service';
import { FlightService } from 'src/app/Services/flight.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})

export class ReservationsComponent implements OnInit {
  selectedFlight: any = {}; // Store the selected flight
  numOfPassengers: number = 0;
  totalPrice: number = 0;
  partners: Partner[] = [];
  userId:any;
  isPayed?:boolean ;
  currentDate = new Date().toISOString().split('T')[0];

  constructor(private router: Router, private flightService: FlightService, private bankService: BankService) {}

  ngOnInit(): void {
    //Fetch the UserId form the token 
    let user: any = localStorage.getItem('user')
    user = JSON.parse(user)
    this.userId = user.userid



    this.selectedFlight = history.state.selectedFlight;
    this.numOfPassengers = history.state.numOfPassengers;
    this.totalPrice = history.state.TotalPrice;
    
    // Initialize partners array with empty Partner objects
    this.partners = Array.from({ length: this.numOfPassengers }, () => ({
      firstName: '',
      lastName: '',
      nationalNumber: '',
      userId: this.userId 
    }));
  }
  PaymentForm:FormGroup = new FormGroup({
    cardnumber: new FormControl(),
    cvv: new FormControl(),
    expirydate: new FormControl()
  });

  // PaymentCheck(){
  //   const paymentData = {
  //     ...this.PaymentForm.value,
  //     balance: this.totalPrice // Add balance (totalPrice) to the form data
  //   };
  //   this.bankService.PaymentCheck(paymentData).subscribe((res) =>{
  //     console.log('Payment service returned: ',res)
  //     this.isPayed = res;
  //   },
  // (error) => {
  //   console.log('Payment service returned:error: ',error)
  // });
  // }
  submitPartners() {
    console.log('The PArtner array: ',this.partners);
    this.partners.forEach((partner) => {
      this.flightService.CreatePartner(partner).subscribe(
        (res) => {
          console.log('Partner saved :) ');
        },
        (err) => {
          console.log('Something went wrong while trying to create a partner :(');
        }
      );
    });
  }
  submitReservation(){
    const userInfo = {
      reservationdate:this.currentDate,
      totalprice: this.totalPrice,
      numofpassengers: this.numOfPassengers,
      userid: this.userId,
      flightid: this.selectedFlight.flightId
    }
    this.flightService.CreateReservation(userInfo).subscribe((res) => {
      console.log('Reservation for light created succesfully');
    },
  (error) => {
    console.log('There was error while trying to set a reservation');
  })
  }

  AllSaved() {
    // Prepare the payment data
    const paymentData = {
      ...this.PaymentForm.value,
      balance: this.totalPrice // Pass the total price to the payment check
    };
    // Call the PaymentCheck method
    this.bankService.PaymentCheck(paymentData).subscribe((res) => {
      console.log('Payment service returned: ', res);
      this.isPayed = res; // Update isPayed based on the response
  
      // Proceed only if the payment was successful
      if (this.isPayed) {
        this.submitReservation(); 
        if(this.numOfPassengers)
        this.submitPartners();     
      } else {
        console.log('Payment was not successful.');
      }
    }, (error) => {
      console.log('Payment service returned: error: ', error);
    });
  }
  
}

interface Partner {
  firstName: string;
  lastName: string;
  nationalNumber: string;
}
