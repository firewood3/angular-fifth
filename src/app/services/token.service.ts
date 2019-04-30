import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{

  private authService: AuthService;

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);
    const token: string = this.authService.getToken();
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(req);
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((response: any) => {
        if(response instanceof HttpErrorResponse && response.status === 401) {
          localStorage.removeItem('token');
          this.router.navigateByUrl("/log-in");
        }
        return throwError(response);
      })
    );
  }

}
