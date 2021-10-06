import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { appReducer } from './store/app.reducer';
import { TaskEffects } from './task-items/store/task.effects';
import { TaskItemsModule } from './task-items/task-items.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    SharedModule,
    AuthenticationModule,
    TaskItemsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([TaskEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
