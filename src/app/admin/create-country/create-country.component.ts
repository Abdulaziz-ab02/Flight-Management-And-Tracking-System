import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-create-country',
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.css']
})
export class CreateCountryComponent {
  constructor(public admin:AdminService){}
  country: { countryname: string, id: number }[] = [];

  createCountryForm: FormGroup = new FormGroup({
    id: new FormControl  ("",Validators.required),
    countryname: new FormControl  ("",Validators.required)
    })
    
  ngOnInit(): void {
    
  }

    
   save(){
    this.admin.createCountry(this.createCountryForm.value);
   }












}
