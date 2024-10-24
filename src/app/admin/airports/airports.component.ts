import { Component, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { CreateAirportComponent } from '../create-airport/create-airport.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css']
})
export class AirportsComponent implements OnInit{
  @ViewChild('deleteAirport') deleteA !: TemplateRef<any>
  @ViewChild('updateAirport') updateA !: TemplateRef<any>
constructor(public admin:AdminService , public dialog:MatDialog){}

ngOnInit(): void {
  this.admin.FetchAllAirports()
}

openDeleteDialog(ID:number){
  this.dialog.open(this.deleteA).afterClosed().subscribe((res)=>{
    if(res!=undefined){
      if(res=='yes')
        this.admin.deleteAirport(ID);
      else if(res='no')
      console.log("THX :)")
    }
  })
}
addAirport(){
this.dialog.open(CreateAirportComponent);

}



UpdateAirport : FormGroup = new FormGroup({
  id: new FormControl (),
  airportname : new FormControl (),
  iatacode:new FormControl (),
  longitude:new FormControl (),
  latitude : new FormControl (),
  airportimage:new FormControl (),
  cityid:new FormControl ()
})
  



pData :any={};
 openUpdateDialog(obj:any){
this.pData=obj;
this.UpdateAirport.controls['id'].setValue(this.pData.id);
this.dialog.open(this.updateA);
 }



 save(){
  this.admin.updateAirport(this.UpdateAirport.value)
 }
}
