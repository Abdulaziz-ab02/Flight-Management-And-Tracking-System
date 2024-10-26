import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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



  //Airport Page
deleteAirport(id:number){
this.http.delete("https://localhost:7117/api/Airport/DeleteAirport/"+id).subscribe(result=>{
console.log("deleted")
},err=>{console.log("error")})
}


createAirport(bod:any){
  bod.airportimage=this.img;
  this.http.post("https://localhost:7117/api/Airport/CreateAirport",bod).subscribe(res=>{
    console.log("airport created");
  },err=>{console.log("try again"); })

}

updateAirport(bod:any){
  bod.airportimage=this.img;
  this.http.put("https://localhost:7117/api/Airport/UpdateAirport",bod).subscribe(res=>{
    console.log("updated")
  },err=>{console.log("error")})
}
  

 // Return Observable for the cities
 GetAllCiies(): Observable<string[]> {
  return this.http.get<string[]>('https://localhost:7117/api/City/GetAllCities');
}

img:any;
uploadImage(file:FormData){
  this.http.post("https://localhost:7117/api/Airport/uploadImage",file).subscribe((res:any)=>{
this.img=res.airportimage;
  },err=>{console.log("error")})
}
}