import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipmentPageComponent } from '../../components/shipment/shipment-page/shipment-page.component';
import { OfficePageComponent } from '../../components/office/office-page/office-page.component';
import { PackagePageComponent } from '../../components/package/package-page/package-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'shipments', pathMatch: 'full' },
  { path: 'shipments', component: ShipmentPageComponent,  data: { title: 'Shipments'}  },
  { path: 'offices', component: OfficePageComponent,  data: { title: 'Offices'}  },
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