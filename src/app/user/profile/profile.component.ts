import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(public home: HomeService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    let user: any = localStorage.getItem('user')
    user = JSON.parse(user)

    // if (token) {
    //   this.home.getUserProfileInfo(user.userid)
    // }
    this.home.getUserProfileInfo(user.userid)

  }




}
