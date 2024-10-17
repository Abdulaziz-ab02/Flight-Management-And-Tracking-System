import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public admin: AdminService) { }

  ngOnInit(): void {
    this.admin.getAllUsers();
    this.admin.FetchAllAirports();
    this.admin.FetchAllReservations();
  }


}
