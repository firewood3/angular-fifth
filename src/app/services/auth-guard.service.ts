import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(public auth: AuthService,
              public router: Router) { }

  canActivate(): boolean {
    if(!this.auth.getToken()) {
      this.router.navigateByUrl('/log-in');
      return false;
    }
    return true;
  }





}
