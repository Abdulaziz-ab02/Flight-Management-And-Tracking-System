import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css']
})
export class AirportsComponent implements OnInit{
constructor(public admin:AdminService){}

ngOnInit(): void {
  this.admin.FetchAllAirports()
}


}
