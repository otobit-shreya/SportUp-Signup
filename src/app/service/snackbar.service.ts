import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class snackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSuccess(message: string, duration: number = 3000): void {
    this.openSnackbar(message, 'success-snackbar', duration);
  }

  openError(message: string, duration: number = 3000): void {
    this.openSnackbar(message, 'error-snackbar', duration);
  }

  private openSnackbar(message: string, panelClass: string, duration: number): void {
    const config: MatSnackBarConfig = {
      duration,
      panelClass: [panelClass],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    };

    this.snackBar.open(message, 'Close', config);
  }
}
