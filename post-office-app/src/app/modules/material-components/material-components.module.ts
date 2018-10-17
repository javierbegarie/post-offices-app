import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatDialogModule
} from '@angular/material';

let modules = [
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatDialogModule
];

@NgModule({
imports: [
  modules
],
exports: [
  modules
],
})
export class MaterialComponentsModule { }
