import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {AppState, selectAuthState} from '../../store/app.states';
import {Store} from '@ngrx/store';
import {SignUp} from '../../store/actions/auth.actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User = new User;
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

  onSubmit(): void{
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new SignUp(payload));
  }

}
