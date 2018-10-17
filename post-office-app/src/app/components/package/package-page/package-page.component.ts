import { Component, OnInit } from '@angular/core';
import { DataSearchTableConfig, DataSearchTablePipe } from '../../shared/data-search-table/data-search-table.component';
import Shipment from '../../../model/shipment';
import { ShipmentService } from '../../../services/shipment.service';

@Component({
  selector: 'app-package-page',
  templateUrl: './package-page.component.html',
  styleUrls: ['./package-page.component.css']
})
export class PackagePageComponent implements OnInit {

  packagesTableConfig: DataSearchTableConfig<Shipment>

  constructor(private _shipmentService:ShipmentService) { 

    this.packagesTableConfig = {
      dataColumns: [
        {
          name: 'id',
          header: 'Id',
          property: 'id',
          pipe: DataSearchTablePipe.PRE_ELLIPSIS
        },
        {
          name: 'status',
          header: 'Status',
          property: 'status',
          pipe: DataSearchTablePipe.TITLE_CASE
        },
        {
          name: 'weightDesc',
          header: 'Weight',
          property: 'weightDesc'
        },
        {
          name: 'weight',
          header: 'Category',
          property: 'weight',
          hidden: true
        },
        {
          name: 'office',
          header: 'Office',
          property: 'office',
          pipe: DataSearchTablePipe.FLATTEN
        }
      ],
      dataStream: this._shipmentService.getPackages
    }

  }

  ngOnInit() {
  }

}
