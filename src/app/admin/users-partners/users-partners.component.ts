import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-users-partners',
  templateUrl: './users-partners.component.html',
  styleUrls: ['./users-partners.component.css']
})
export class UsersPartnersComponent implements OnInit {
  constructor(public admin: AdminService) { }

  Partners: any = [];

  UsersWithPartners: any = [];
  ngOnInit(): void {
    this.loadUsersWithPartners();

  }

  loadUsersWithPartners() {
    this.admin.GetUsersWithPartners().subscribe(
      res => {
        this.UsersWithPartners = res;
      },
      err => {
        console.error('error fetching UsersWithPartners')
      }
    )
  }


  OpenPartnersDialog(id: number) {
    this.admin.GetPartnersByUser(id).subscribe(
      res => {
        this.Partners = res;
        console.log("length", this.Partners.length)

      },
      err => {
        console.log("error fetching PartnersByUser")
      }
    )
  }


}
