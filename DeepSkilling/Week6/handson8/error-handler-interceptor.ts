import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {

        alert('Unauthorized! Please login.');

      }

      else if (error.status === 404) {

        alert('Resource not found.');

      }

      else if (error.status === 500) {

        alert('Internal Server Error.');

      }

      else {

        alert('Something went wrong.');

      }

      return throwError(() => error);

    })

  );

};