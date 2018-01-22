import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, filter, scan, tap } from 'rxjs/operators';

import { TOKEN_NAME } from '@core/helpers';

import { IRequestOptions } from '@core/services/custom-http-client';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt_token = localStorage.getItem(TOKEN_NAME);

    if (jwt_token) {
      const options: IRequestOptions = {
        headers: req.headers.set('Authorization', 'Bearer ' + jwt_token),
        reportProgress: true
      };
      const cloned = req.clone(options);

      return next.handle(cloned).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
          }
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              // do redirect
            }
          }
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
