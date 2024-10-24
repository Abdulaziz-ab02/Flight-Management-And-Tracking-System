import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-airline-register',
  templateUrl: './airline-register.component.html',
  styleUrls: ['./airline-register.component.css']
})
export class AirlineRegisterComponent {

  constructor(private auth: AuthService) { }

    createAirlineForm = new FormGroup({
      airlineName: new FormControl('', Validators.required),
      airlineImage: new FormControl('', Validators.required),
      airlineEmail: new FormControl('ex@example.com', [Validators.required, Validators.email]),
      airlineAddress: new FormControl('', Validators.required),
      activationStatus: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('*****', Validators.required),
      repeatPassword: new FormControl('*****', Validators.required),
      roleid: new FormControl()
    })

    matchError() {
      if (this.createAirlineForm.controls['password'].value ==
        this.createAirlineForm.controls['repeatPassword'].value
      )
        this.createAirlineForm.controls['repeatPassword'].setErrors(null)
      else
        this.createAirlineForm.controls['repeatPassword'].setErrors({ misMatch: true })
    }

 
  submit() {
    this.createAirlineForm.controls['roleid'].setValue(3);
    this.auth.CreateUser(this.createAirlineForm.value)
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
    this.auth.uploadAttachment(formData);

  }
}
