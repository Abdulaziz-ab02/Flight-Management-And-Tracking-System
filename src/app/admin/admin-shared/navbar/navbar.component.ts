import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public home: HomeService, private router: Router) { }


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

  Logout() {
    localStorage.clear()
    //this.isLoggedIn = false;
    this.router.navigate(['guest/home'])
  }

}
