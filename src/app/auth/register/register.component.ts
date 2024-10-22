import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private auth: AuthService) { }


  createUser: FormGroup = new FormGroup({
    //the names as the output from swagger
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('ex@example.com', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    dateofbirth: new FormControl('', Validators.required),
    nationalnumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required),
    roleid: new FormControl(),
    image: new FormControl()
  })

  matchError() {
    if (this.createUser.controls['password'].value ==
      this.createUser.controls['repeatPassword'].value
    )
      this.createUser.controls['repeatPassword'].setErrors(null)
    else
      this.createUser.controls['repeatPassword'].setErrors({ misMatch: true })
  }

  submit() {
    this.createUser.controls['roleid'].setValue(2);
    this.auth.CreateCourse(this.createUser.value)
  }

}
