import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialComponentsModule } from './modules/material-components/material-components.module';
import { AppRoutingModule, RoutingComponents } from './modules/app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DataSearchTableComponent } from './components/shared/data-search-table/data-search-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoutingComponents,
    DataSearchTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
