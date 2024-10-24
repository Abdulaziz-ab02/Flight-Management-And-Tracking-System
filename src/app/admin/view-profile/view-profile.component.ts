import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  constructor(public home: HomeService) { }


  role_id: any;

  ngOnInit(): void {

    let user: any = localStorage.getItem('user')
    user = JSON.parse(user)
    this.role_id = user.roleid;

    if (this.role_id == 1)
      this.home.getUserProfileInfo(user.userid)
    else if (this.role_id == 3)
      this.home.getAirlineProfileInfo(user.airlineid)

  }

}
