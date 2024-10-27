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

  isLoggedIn: boolean = false;
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    //if the user is loggen in 
    if (token) {
      this.isLoggedIn = true;
    }
  }

  Logout() {
    localStorage.clear()
    this.isLoggedIn = false;
    this.router.navigate(['guest/home'])
    window.location.reload();
  }

}
