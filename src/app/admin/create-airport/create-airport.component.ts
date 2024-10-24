import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-create-airport',
  templateUrl: './create-airport.component.html',
  styleUrls: ['./create-airport.component.css']
})
export class CreateAirportComponent {
  constructor(public admin:AdminService){}
  createAirport : FormGroup= new FormGroup ({
    airportname : new FormControl ("",Validators.required),
    iatacode:new FormControl ("",Validators.required),
    longitude:new FormControl ("",Validators.required),
    latitude : new FormControl ("",Validators.required),
    airportimage:new FormControl (),
    cityid:new FormControl ("",Validators.required)
   })
  
  
   save(){
    this.admin.createAirport(this.createAirport.value);
   }
  



}
