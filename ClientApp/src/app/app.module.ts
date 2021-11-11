import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ApplicationModule } from './application/application.module';
import { TaskEffects } from './application/task-items/store/task.effects';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationEffects } from './authentication/store/authentication.effects';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { appReducer } from './store/app.reducer';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    SharedModule,
    AuthenticationModule,
    ApplicationModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoggerModule.forRoot(
      {
        level: !environment.production ? NgxLoggerLevel.DEBUG : NgxLoggerLevel.OFF,
        serverLogLevel: NgxLoggerLevel.OFF
      }
    ),
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([TaskEffects, AuthenticationEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
