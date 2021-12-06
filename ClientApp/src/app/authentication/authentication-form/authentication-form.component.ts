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

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      token: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ])
    });
  }

  submit(token: string, rememberMe: boolean) {
    if (rememberMe)
      this.store.dispatch(new SetTokenInLocalStorage(token));

    this.store.dispatch(new SetToken(token));
  }

  getErrorMessageFieldToken() {
    const field = this.form.get('token');

    if (field?.hasError('required')) {
      return 'The token is required';
    }

    if (field?.hasError('maxlength')) {
      return 'The maximum token length is 25';
    }

    if (field?.hasError('minlength')) {
      return 'The minimum token length is 3';
    }

    return '';
  }
}
