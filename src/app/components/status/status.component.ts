import { Component, OnInit } from '@angular/core';
import {AppState} from '../../store/app.states';
import {Store} from '@ngrx/store';
import {GetStatus} from '../../store/actions/auth.actions';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new GetStatus);
  }

}
