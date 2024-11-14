import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FlightService } from 'src/app/Services/flight.service';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit {

  constructor(private flightService: FlightService,
    public dialog: MatDialog
  ) { }

  Facilites: any = [];
  @ViewChild('callDeleteDailog') deleteDialog !: TemplateRef<any>;
  @ViewChild('callCreateDailog') createDialog !: TemplateRef<any>;
  @ViewChild('callUpdateDailog') updateDialog !: TemplateRef<any>;


  ngOnInit(): void {
    this.loadFacilities();
  }

  loadFacilities() {
    this.flightService.getAllFacilities().subscribe(
      (res) => {
        this.Facilites = res;
      },
      err => {
        console.log("error loading Facilities")
      }
    )
  }


  createFacility: FormGroup = new FormGroup({
    facilityname: new FormControl('', Validators.required)
  })

  openCreateDialog() {
    this.dialog.open(this.createDialog)
  }

  create() {
    this.flightService.CreateFacility(this.createFacility.value).subscribe(
      res => {
        console.log("facility created")
        window.location.reload();
      },
      err => {
        console.log("error creating facility")
      }
    )
  }




  updateFacility: FormGroup = new FormGroup({
    id: new FormControl(),
    facilityname: new FormControl()
  })

  pData: any = {};
  openUpdateDialog(obj: any) {
    this.pData = obj;
    this.updateFacility.controls['id'].setValue(this.pData.id)
    this.dialog.open(this.updateDialog);
  }

  update() {
    this.flightService.UpdateFacility(this.updateFacility.value).subscribe(
      res => {
        console.log("facility updated")
        window.location.reload();
      },
      err => {
        console.log("error updating facility")
      }
    )
  }




  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.deleteDialog).afterClosed().subscribe(
      result => {
        if (result != undefined) {
          if (result == 'yes')
            this.flightService.DeleteFacility(id).subscribe(
              res => {
                console.log("faciliy deleted")
                window.location.reload();
              },
              err => {
                console.log("error deleting facility")
              }
            );
          else if (result == 'no')
            console.log('Facility deletion canceled')
        }
      });
  }



}
