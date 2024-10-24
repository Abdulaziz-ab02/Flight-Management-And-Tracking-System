import { Component, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';


@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css']
})
export class AirportsComponent implements OnInit{
  @ViewChild('deleteAirport') deleteA !: TemplateRef<any>
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
addAirport(){}


}
