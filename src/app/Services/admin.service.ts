import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http: HttpClient) { }


  users: any = [];
  UsersCount: number = 0;
  getAllUsers() {
    this.http.get('https://localhost:7117/api/User/GetAllUsers').subscribe(result => {
      this.users = result;
      this.UsersCount = this.users.length;

    }, err => {
      console.log(err.message)
    });
  }

airline:any=[];
  GetAllAirline() {
    this.http.get('https://localhost:7117/api/Airline').subscribe(result => {
    this.airline=result;

    }, err => {
      console.log(err.message)
    });
  }


  airport:any=[];
  AirportCount: number = 0;
  FetchAllAirports() {
    this.http.get('https://localhost:7117/api/Airport').subscribe(result => {
    this.airport=result;
    this.AirportCount = this.airport.length;
    }, err => {
      console.log(err.message)
    });
  }


 reservation: any = [];
  ReservationCount: number = 0;
  FetchAllReservations() {
    this.http.get('https://localhost:7117/api/Reservation').subscribe(result => {
this.reservation=result;
      this.ReservationCount = this.reservation.length;

    }, err => {
      console.log(err.message)
    });
  }

deleteAirport(id:number){
this.http.delete("https://localhost:7117/api//Airport/DeleteAirport/"+id).subscribe(result=>{
console.log("deleted")
},err=>{console.log("error")})
}

}
