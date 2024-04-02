import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  template: `
    <h1>Error</h1>
    <p>{{ errorMessage }}</p>
  `,
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public errorMessage: string) {}
}
