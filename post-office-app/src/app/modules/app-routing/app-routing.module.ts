import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipmentPageComponent } from '../../components/shipment/shipment-page/shipment-page.component';
import { OfficePageComponent } from '../../components/office/office-page/office-page.component';
import { PackagePageComponent } from '../../components/package/package-page/package-page.component';
import { ShipmentListComponent } from '../../components/shipment/shipment-list/shipment-list.component';
import { ShipmentFormComponent } from '../../components/shipment/shipment-form/shipment-form.component';
import { OfficeListComponent } from '../../components/office/office-list/office-list.component';
import { OfficeFormComponent } from '../../components/office/office-form/office-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'shipments', pathMatch: 'full' },
  { path: 'shipments', component: ShipmentPageComponent, children:
    [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ShipmentListComponent },
      { path: 'new', component: ShipmentFormComponent},
      { path: 'update/:id', component: ShipmentFormComponent}
    ] 
  },
  { path: 'offices', component: OfficePageComponent,  children:
    [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: OfficeListComponent },
      { path: 'new', component: OfficeFormComponent},
      { path: 'update/:id', component: OfficeFormComponent}
    ] 
  },
  { path: 'packages', component: PackagePageComponent, data: { title: 'Packages'}  },
  { path: '**', redirectTo: 'shipments', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [
  ShipmentPageComponent,
  OfficePageComponent,
  PackagePageComponent
];