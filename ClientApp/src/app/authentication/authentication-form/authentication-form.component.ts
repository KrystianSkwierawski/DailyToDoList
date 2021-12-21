import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { SetToken, SetTokenInLocalStorage } from '../store/authentication.actions';

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.scss']
})
export class AuthenticationFormComponent implements OnInit {

  form: FormGroup
  hideToken: boolean = true;

  private tokenTemplate: string = 'xxxxxxxxxx-xxxxx-4xxx-yxxx-xxxxxxxxxxxx-xxxxxxxxxx-xxxxx-4xxx-yxxx-xxxxxxxxxxxx';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      token: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9,a-z]{10}-[0-9,a-z]{5}-[0-9,a-z]{4}-[0-9,a-z]{4}-[0-9,a-z]{12}-[0-9,a-z]{10}-[0-9,a-z]{5}-[0-9,a-z]{4}-[0-9,a-z]{4}-[0-9,a-z]{12}$')
      ])
    });
  }

  submit(token: string, rememberMe: boolean) {
    if (rememberMe)
      this.store.dispatch(new SetTokenInLocalStorage(token));

    this.store.dispatch(new SetToken(token));
  }

  generateRandomToken() {
    const randomToken: string = this.tokenTemplate.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    this.hideToken = false;
    this.form.get('token')?.setValue(randomToken);
  }

  getErrorMessageFieldToken() {
    const field = this.form.get('token');

    if (field?.hasError('required')) {
      return 'The token is required';
    }

    if (field?.hasError('pattern')) {
      return 'The token is invalid, click the Generate Random Token Button';
    }

    return '';
  }
}
