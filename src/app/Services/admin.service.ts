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



}
