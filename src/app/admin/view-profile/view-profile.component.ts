import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/Services/auth.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  constructor(public home: HomeService, public auth: AuthService, public dialog: MatDialog) { }

  @ViewChild('callAirlineUpdateDailog') airlineUpdateDialog !: TemplateRef<any>;


  role_id: any;

  ngOnInit(): void {

    let user: any = localStorage.getItem('user')
    user = JSON.parse(user)
    this.role_id = user.roleid;

    if (this.role_id == 1)
      this.home.getUserProfileInfo(user.userid)
    else if (this.role_id == 3)
      this.home.getAirlineProfileInfo(user.airlineid)

  }

  //admin




  //airline
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
  openAirlineUpdateDialog(obj: any) {
    this.pData = obj;

    this.updateAirlineForm.controls['id'].setValue(this.pData.id);
    this.updateAirlineForm.controls['activationstatus'].setValue(this.pData.id);

    this.auth.airlineImage = this.pData.airlineimage

    this.dialog.open(this.airlineUpdateDialog)
  }

  save() {
    this.auth.UpdateAirline(this.updateAirlineForm.value)
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
