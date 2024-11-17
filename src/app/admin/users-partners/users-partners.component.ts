import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-users-partners',
  templateUrl: './users-partners.component.html',
  styleUrls: ['./users-partners.component.css']
})
export class UsersPartnersComponent implements OnInit {
  constructor(public admin: AdminService) { }

  UsersWithPartners: any = [];
  ngOnInit(): void {
    this.loadUsersWithPartners();
  }

  loadUsersWithPartners() {
    this.admin.GetUsersWithPartners().subscribe(
      res => {
        this.UsersWithPartners = res;
        console.log("tset", this.UsersWithPartners)
      },
      err => {
        console.error('error fetching UsersWithPartners')
      }
    )
  }

}
