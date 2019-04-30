import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {AppState, selectAuthState} from '../../store/app.states';
import {Store} from '@ngrx/store';
import {LogIn} from '../../store/actions/auth.actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state)=>{
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    console.log(this.user);
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    console.log("log-in component: dispatch", this.user);
    this.store.dispatch(new LogIn(payload));
  }
}
