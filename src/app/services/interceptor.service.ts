import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {LoaderService} from './loader.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.setLoadingState(true, request.url);
    return next.handle(request).pipe(
      map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this.loaderService.setLoadingState(false, request.url);
        }
        return evt;
      })).pipe(catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 404:
            console.error('BAD_CALL_ERROR', error);
            break;

          case 500:
            console.error('UNEXPECTED_ERROR', error);
            break;

          default:
            console.error('Error from error interceptor', error);
            break;
        }
        return throwError(error);
      }),
    );
  }
}
