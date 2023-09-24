import { Component } from '@angular/core';
import SignUpForm from './signUp.domainModel';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpForm = new SignUpForm();

  onSignUpFormSubmit() {
    console.log(this.signUpForm);
  }
}
