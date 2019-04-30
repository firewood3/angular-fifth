import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthEffects} from './store/effects/auth.effects';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/app.states';
import {AuthService} from './services/auth.service';
import {ErrorInterceptor, TokenInterceptor} from './services/token.service';
import { StatusComponent } from './components/status/status.component';
import {AuthGuardService} from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LogInComponent,
    SignUpComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(reducers, {}),
    RouterModule.forRoot([
      {path: 'log-in', component: LogInComponent},
      {path: 'sign-up', component: SignUpComponent},
      {path: 'status', component: StatusComponent, canActivate: [AuthGuardService]},
      {path: '', component: LandingComponent},
      {path: '**', redirectTo: '/'},

    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
