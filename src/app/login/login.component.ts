import { Component } from '@angular/core';
import LoginForm from './login.domainModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor() {}
  loginForm = new LoginForm();

  onLoginFormSubmit() {
    console.log(this.loginForm);
  }
}
