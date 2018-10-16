import { Component, OnInit } from '@angular/core';
import { DataSearchTableConfig, DataSearchTablePipe } from '../../shared/data-search-table/data-search-table.component';
import Shipment from '../../../model/shipment';
import { ShipmentService } from '../../../services/shipment.service';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.css']
})
export class ShipmentListComponent implements OnInit {

  shipmentsTableConfig: DataSearchTableConfig<Shipment>;
  constructor(private _shipmentService:ShipmentService) {

    this.shipmentsTableConfig = {
      columns: [
        {
          name: 'type',
          header: 'Shipment Type',
          property: 'type',
          pipe: DataSearchTablePipe.TITLE_CASE
        },
        {
          name: 'status',
          header: 'Status',
          property: 'status',
          pipe: DataSearchTablePipe.TITLE_CASE
        },
        {
          name: 'weight',
          header: 'Weight',
          property: 'weight'
        }
      ],
      dataStream: this._shipmentService.getShipments
    }
  }
  
  ngOnInit() {

  }

}
