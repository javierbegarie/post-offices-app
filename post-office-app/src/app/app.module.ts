import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialComponentsModule } from './modules/material-components/material-components.module';
import { AppRoutingModule, RoutingComponents } from './modules/app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DataSearchTableComponent } from './components/shared/data-search-table/data-search-table.component';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { PipeSwitchPipe } from './pipes/pipe-switch.pipe';
import { FlattenPipe } from './pipes/flatten.pipe';
import { OfficeListComponent } from './components/office/office-list/office-list.component';
import { OfficeFormComponent } from './components/office/office-form/office-form.component';
import { ShipmentListComponent } from './components/shipment/shipment-list/shipment-list.component';
import { ShipmentFormComponent } from './components/shipment/shipment-form/shipment-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DeleteConfirmDialogComponent } from './components/shared/delete-confirm-dialog/delete-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoutingComponents,
    DataSearchTableComponent,
    EllipsisPipe,
    PipeSwitchPipe,
    FlattenPipe,
    OfficeListComponent,
    OfficeFormComponent,
    ShipmentListComponent,
    ShipmentFormComponent,
    DeleteConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents:[
    DeleteConfirmDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
