import { Component,  OnInit, TemplateRef, ViewChild, ViewChildren  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateCountryComponent } from '../create-country/create-country.component';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent {
  @ViewChild('deleteCountry') deleteCountry !: TemplateRef<any>
  @ViewChild('updateCountry') updateCountry !: TemplateRef<any>
constructor(public admin:AdminService , public dialog:MatDialog){}


ngOnInit(): void {
  this.admin.getAllCountries();
}
openDeleteDialog(id:number){
  this.dialog.open(this.deleteCountry).afterClosed().subscribe((res)=>{
    if(res!=undefined){
      if(res=='yes')
        this.admin.deleteCountry(id);
      else if(res='no')
      console.log("THX :)")
    }
  })
}
addCountry(){
this.dialog.open(CreateCountryComponent);
}



UpdateCountry : FormGroup = new FormGroup({
  id: new FormControl (),
  countryname: new FormControl ()
})
  



pData :any={};
 openUpdateDialog(obj:any){
  this.pData=obj;
  this.UpdateCountry.patchValue({
    id: this.pData.id,
    countryname: this.pData.countryname
  });
 
  
this.UpdateCountry.controls['id'].setValue(this.pData.id);

console.log("Initial id:", this.pData.id);
this.dialog.open(this.updateCountry);

 }
save() {

  const updatedData = { ...this.UpdateCountry.value };
  this.admin.updateCountry(updatedData);
  this.dialog.closeAll(); 
}

cancel() {
  this.dialog.closeAll(); 
}











}
