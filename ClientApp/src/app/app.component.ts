import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { AppState } from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  authenticationStoreSub: Subscription;
  webApp: boolean = environment.webApp;

  authenticated: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.authenticationStoreSub = this.store.select('authentication').subscribe(authenticationState => {
      this.authenticated = !!authenticationState.token;
    });
  }

  ngOnDestroy(): void {
    this.authenticationStoreSub.unsubscribe();
  }
}
