// src/app/components/country/country.component.ts
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { CreateCountryComponent } from '../create-country/create-country.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  @ViewChild('deleteCountry') deleteCountry!: TemplateRef<any>;
  @ViewChild('updateCountry') updateCountry!: TemplateRef<any>;
createCountryForm: any;

  constructor(public admin: AdminService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.admin.getAllCountries();
  }

  openDeleteDialog(id: number): void {
    this.dialog.open(this.deleteCountry).afterClosed().subscribe((res) => {
      if (res === 'yes') {
        this.admin.deleteCountry(id);
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  openUpdateDialog(obj: any): void {
    this.admin.updateCountryForm.patchValue({
      id: obj.id,
      countryname: obj.countryname
    });
    this.dialog.open(this.updateCountry);
  }

  save(): void {
    if (this.admin.updateCountryForm.valid) {
      const updatedData = this.admin.updateCountryForm.value; 
      this.admin.updateCountry(updatedData); 
      this.dialog.closeAll();
    } else {
      console.log('Form is not valid');
    }
  }

  addCountry(): void {
    this.dialog.open(CreateCountryComponent);
  }

}
