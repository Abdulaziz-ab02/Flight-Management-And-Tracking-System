import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }


  CreateCourse(body: any) {
    // debugger

    // body.imagename = this.displayImage;

    this.http.post('https://localhost:7117/api/User/CreateUser', body).subscribe(
      (resp) => {
        console.log('user created')
      }, err => {
        console.log('Error')
      })
    window.location.reload();
  }



}
