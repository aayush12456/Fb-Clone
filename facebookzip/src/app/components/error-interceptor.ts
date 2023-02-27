import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { catchError, throwError } from "rxjs";
import { ErrorComponent } from "./error/error.component";
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public dialog: MatDialog) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'An unknown error is occured'
                if (error.error.message) {
                    errorMessage = error.error.message
                }
                console.log(error)
                this.dialog.open(ErrorComponent, { data: { message: errorMessage } })
                return throwError(error)
            })
        )
    }

}