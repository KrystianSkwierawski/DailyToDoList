import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';

@Component({
  selector: 'app-auth-view',
  templateUrl: './auth-view.component.html',
  styleUrls: ['./auth-view.component.scss']
})
export class AuthViewComponent implements OnInit {

  authenticated: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('authentication').subscribe(authenticationState => {
      this.authenticated = !!authenticationState.token;
    });
  }
}
