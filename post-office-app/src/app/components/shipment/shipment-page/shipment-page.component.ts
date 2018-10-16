import { Component, OnInit } from '@angular/core';
import Shipment from '../../../model/shipment';
import { DataSearchTableConfig } from '../../shared/data-search-table/data-search-table.component';
import { ShipmentService } from '../../../services/shipment.service';

@Component({
  selector: 'app-shipment-page',
  templateUrl: './shipment-page.component.html',
  styleUrls: ['./shipment-page.component.css']
})
export class ShipmentPageComponent implements OnInit {

  shipmentsTableConfig: DataSearchTableConfig<Shipment>;
  constructor(private _shipmentService:ShipmentService) {

    this.shipmentsTableConfig = {
      columns:[
        {
          name: 'type',
          header: 'Shipment Type',
          property: 'type',
          titleCase: true
        },
        {
          name: 'status',
          header: 'Status',
          property: 'status',
          titleCase: true
        }
      ],
      dataStream: this._shipmentService.getShipments
    }

  }

  ngOnInit() {
  }

}
