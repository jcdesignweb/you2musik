import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";

import {
    HttpErrorResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { ViewService } from '../services/view.service';

import { tap } from 'rxjs/operators';



import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
    constructor(private view: ViewService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        return next.handle(request)
            .pipe(
                map(res => {
                    console.log("Passed through the interceptor in response");
                    return res
                }),

                catchError((e: HttpErrorResponse) => {
                    console.log(
                        'the interceptor has caught an error, process it here',
                        e
                    );

                    const { error } = e

                    // error message from the server
                    if (error.message) {
                        this.view.showToast("error")

                    }

                    return throwError(() => error);
                })

            )
    }
}