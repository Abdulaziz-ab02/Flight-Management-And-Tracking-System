import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../airline/flights/flights.component';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(public http: HttpClient) { }

  SearchForFlight(body: any): Observable<any> {
    return this.http.post('https://localhost:7117/api/Flight/FetchFlightBasedOnUserSearch', body);
  }

  GetAllCiies(): Observable<string[]> {
    return this.http.get<string[]>('https://localhost:7117/api/City/GetAllCities');
  }

  GetAllFacilitesByDegree(id: number): Observable<any> {
    return this.http.get('https://localhost:7117/api/Flight/GetAllFacilitesByDegreeId/' + id);
  }

  GetAllFlightsByAirlineID(id: number): Observable<any> {
    return this.http.get('https://localhost:7117/api/Flight/GetAllFlightsByAirlineID/' + id);
  }

<<<<<<< HEAD
  CreateFlight(flight: any): Observable<any> {
    return this.http.post('https://localhost:7117/api/Flight/CreateFlight', flight);
=======
 CreateFlight(flight: Flight): Observable<any> {
  return this.http.post('https://localhost:7117/api/Flight/CreateFlight', flight);
}

DeleteFlight(id: number): Observable<any> {
  return this.http.delete('https://localhost:7117/api/Flight/DeleteFlight/' + id);
}

UpdateFlight(flight: Flight): Observable<any> {
  return this.http.put('https://localhost:7117/api/Flight/UpdateFlight' , flight);
}
 
  CreatePartner(body:any): Observable<any> {
    return this.http.post('https://localhost:7117/api/Partner/CreatePartner',body);
>>>>>>> 3bf7f304b7a2f7e6dc6c0ec0f666dfd497b4514a
  }

  DeleteFlight(id: number): Observable<any> {
    return this.http.delete('https://localhost:7117/api/Flight/DeleteFlight/' + id);
  }

  UpdateFlight(flight: any): Observable<any> {
    return this.http.put('https://localhost:7117/api/Flight/UpdateFlight', flight);
  }

  CreatePartner(body: any): Observable<any> {
    return this.http.post('https://localhost:7117/api/Partner/CreatePartner', body);
  }

  CreateReservation(body: any): Observable<any> {
    return this.http.post('https://localhost:7117/api/Reservation/CreateReservation', body);
  }

  FetchAllAirports(): Observable<any> {
    return this.http.get('https://localhost:7117/api/Airport');
  }

  FetchAllDegrees(): Observable<any> {
    return this.http.get('https://localhost:7117/api/Degree/GetAllDegrees');
  }
}
