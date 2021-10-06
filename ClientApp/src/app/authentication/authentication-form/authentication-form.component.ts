import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.scss']
})
export class AuthenticationFormComponent implements OnInit {

  form: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      token: new FormControl('')
    });
  }


  submit(token: string) {
    console.log(token);
  }
}
