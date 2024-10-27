import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})
export class AirlinesComponent implements OnInit{
constructor (public admin:AdminService){}

ngOnInit(): void {
  this.admin.GetAllAirline()
}



// airlines.component.ts
approveAirline(id: number) {
  this.admin.changeAirlineStatus(id, 'Approved').subscribe(
    () => {
      console.log("Airline approved successfully"); // Log success
      this.admin.GetAllAirline(); // Refresh the list after approval
    },
    error => {
      console.error("Error approving airline", error); // Log any errors
    }
  );
}

// airlines.component.ts
rejectAirline(id: number) {
  this.admin.deleteAirline(id);
}


}
