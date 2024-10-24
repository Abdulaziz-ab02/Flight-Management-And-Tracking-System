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

    let user: any = localStorage.getItem('user')
    user = JSON.parse(user)

    this.home.getUserProfileInfo(user.userid)

  }




}
