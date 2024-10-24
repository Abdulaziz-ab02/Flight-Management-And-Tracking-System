import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  constructor(public home: HomeService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    let user: any = localStorage.getItem('user')
    user = JSON.parse(user)

    this.home.getUserProfileInfo(user.userid)
  }

}
