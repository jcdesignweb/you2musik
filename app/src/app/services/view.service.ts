import { Injectable } from '@angular/core';

import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Injectable({
    providedIn: 'root'
})
export class ViewService {

    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(private snack: MatSnackBar) { }

    showToast(message: string) {
        this.snack.open(message, '', {
            duration: 1500,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        })
        console.log("LLEGO")

    }
}
