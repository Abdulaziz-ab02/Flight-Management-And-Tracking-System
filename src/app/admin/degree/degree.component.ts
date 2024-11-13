import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.css']
})
export class DegreeComponent implements OnInit {
  @ViewChild('callUpdateDailog') updateD !: TemplateRef<any>
  @ViewChild('callFacilityDailog') facilityD !: TemplateRef<any>

  degree: { degreename: string, id: number }[] = [];  
  Facilites: any[] = [];


  constructor(public admin: AdminService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadDegrees();
    
  
  
  }



  loadDegrees(){
    this.admin.GetAllDegrees().subscribe((res:any[]) => {
      this.degree = res.map(degreeObj => ({
        degreename: degreeObj.degreename,
        id:degreeObj.id
      }));
    },
  (error) => {
    console.log('There was an error while tring to hit Degree API :(');
  })
  }

 

  getFacilities(id: number) {
    console.log('Fetching facilities for degree ID:', id);
    this.admin.GetAllFacilitesByDegree(id).subscribe(
      (res: any[]) => {
        this.Facilites = res.map((facility: any) => ({
          facilityname: facility.facilityname
        }));
      },
      (err: any) => {
        console.error('Error fetching facilities:', err);
      }
    );
  }


  UpdateDegree: FormGroup = new FormGroup({
    id: new FormControl(),
    degreename: new FormControl(),
  
  });

  pData: any = {};
  updateDegree(obj: any) {
    this.pData = obj;
    this.UpdateDegree.controls['id'].setValue(this.pData.id);
    this.dialog.open(this.updateD);

  }





 deleteDegree(obj:any){
  
 }

 save() {
 
}

}
