import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/Services/auth.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(public home: HomeService, public dialog: MatDialog, public auth: AuthService) { }

  @ViewChild('callUpdateDailog') updateDialog !: TemplateRef<any>;

  ngOnInit(): void {
    let airline: any = localStorage.getItem('airline')
    airline = JSON.parse(airline)

    this.home.getAirlineProfileInfo(airline.airlineid)
  }

  updateAirlineForm: FormGroup = new FormGroup({
   
    airlinename: new FormControl(),
    airlineimage: new FormControl(),
    airlineemail: new FormControl(),
    airlineaddress: new FormControl(),
    activationstatus: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
    id: new FormControl()
  })


 
  pData: any = {}
  openUpdateDialog(obj: any) {
    this.pData = obj;

    this.updateAirlineForm.controls['id'].setValue(this.pData.id);
    this.auth.airlineImage = this.pData.airlineimage

    this.dialog.open(this.updateDialog)
  }

  save() {
    this.auth.UpdateUser(this.updateAirlineForm.value)
  }

  uploadImage(file: any) {
    //no image uploaded
    if (file.length == 0)
      return;

    //take first image (if user uploaded multiple images)
    let fileToUpload = <File>file[0];

    //trun to formdata so the func in service accept it
    const formData = new FormData();
    formData.append('file', fileToUpload, file.name)
    this.auth.uploadAttachmentAirline(formData);

  }

}
