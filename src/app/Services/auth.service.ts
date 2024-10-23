import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient,
    private router: Router) { }


  CreateUser(body: any) {
    //debugger
    body.image = this.userImage;

    this.http.post('https://localhost:7117/api/User/CreateUser', body).subscribe(
      (resp) => {
        console.log('user created')
        this.router.navigate(['security/login']);
      }, err => {
        console.log('Error')
      })
  }


  userImage: any;
  //FormData => interface to send obj
  uploadAttachment(file: FormData) {
    this.http.post('https://localhost:7117/api/User/uploadImage', file).subscribe(
      (resp: any) => {
        this.userImage = resp.image;
        console.log('image uploaded')
      }, err => {
        console.log('Error')
      })
  }



}
