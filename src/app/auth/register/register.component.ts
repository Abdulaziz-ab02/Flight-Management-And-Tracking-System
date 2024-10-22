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


  createUserForm: FormGroup = new FormGroup({
    //the names as the output from swagger
    firstname: new FormControl('Your First Name', Validators.required),
    lastname: new FormControl('Your Last Name', Validators.required),
    username: new FormControl('Your Username', Validators.required),
    email: new FormControl('ex@example.com', [Validators.required, Validators.email]),
    phone: new FormControl('Your Phone'),
    dateofbirth: new FormControl(''),
    nationalnumber: new FormControl('Your National Number', Validators.required),
    password: new FormControl('********', Validators.required),
    repeatPassword: new FormControl('********', Validators.required),
    image: new FormControl(),
    roleid: new FormControl()
  })

  matchError() {
    if (this.createUserForm.controls['password'].value ==
      this.createUserForm.controls['repeatPassword'].value
    )
      this.createUserForm.controls['repeatPassword'].setErrors(null)
    else
      this.createUserForm.controls['repeatPassword'].setErrors({ misMatch: true })
  }

  submit() {
    this.createUserForm.controls['roleid'].setValue(2);
    this.auth.CreateUser(this.createUserForm.value)
  }

}
