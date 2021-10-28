import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
      token: new FormControl('')
    });
  }

  submit(token: string, rememberMe: boolean) {
    if (rememberMe)
      this.store.dispatch(new SetTokenInLocalStorage(token));

    this.store.dispatch(new SetToken(token));
  }
}
