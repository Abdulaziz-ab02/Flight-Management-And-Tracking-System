import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(public http: HttpClient) { }

  // Return Observable so the component can subscribe to it
  SearchForFlight(body: any): Observable<any> {
    return this.http.post('https://localhost:7117/api/Flight/FetchFlightBasedOnUserSearch' , body);
    console.log('service time');
  }

  // Return Observable for the cities
  GetAllCiies(): Observable<string[]> {
    return this.http.get<string[]>('https://localhost:7117/api/City/GetAllCities');
  }
  GetAllFacilitesByDegree(id: number): Observable<any> {
    return this.http.get('https://localhost:7117/api/Flight/GetAllFacilitesByDegreeId/' + id);
  }
  GetAllFlightsByAirlineID(id: number): Observable<any> {
    return this.http.get('https://localhost:7117/api/Flight/GetAllFlightsByAirlineID/' + id);
  }

 CreateFlight(flight: any): Observable<any> {
  return this.http.post('https://localhost:7117/api/Flight/CreateFlight', flight);
}

DeleteFlight(id: number): Observable<any> {
  return this.http.delete('https://localhost:7117/api/Flight/DeleteFlight/' + id);
}

UpdateFlight(flight: any): Observable<any> {
  return this.http.put('https://localhost:7117/api/Flight/UpdateFlight' , flight);
}
 
  CreatePartner(body:any): Observable<any> {
    return this.http.post('https://localhost:7117/api/Partner/CreatePartner',body);
  }
  CreateReservation(body:any): Observable<any>{
    return this.http.post('https://localhost:7117/api/Reservation/CreateReservation', body);
  }
  FetchAllAirports(body:any): Observable<any>{
    return this.http.get('https://localhost:7117/api/Airport', body);
  }
  
}
