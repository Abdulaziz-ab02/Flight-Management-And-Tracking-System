import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe:   boolean = false;
  constructor(private router: Router) {} // Inject Router service
  ngOnInit() {
    // Check if there is saved data in local storage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUsername && storedPassword) {
      this.username = storedUsername;
      this.password = storedPassword;
      this.rememberMe = true;  // Set 'Remember me' checkbox to checked
    }
  }
  onSubmitLogin() {
    // Save the username and password in local storage
    if(this.rememberMe){
      if (this.username && this.password) {
        localStorage.setItem('username', this.username);
        localStorage.setItem('password', this.password);
        console.log('Data saved in local storage');
      } else {
        console.log('Username or password is missing');
      }
    }
    this.router.navigate(['/user/home']);

  }

}
