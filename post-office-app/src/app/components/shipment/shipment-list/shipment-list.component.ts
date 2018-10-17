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
      dataColumns: [
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
          name: 'weightDesc',
          header: 'Weight',
          property: 'weightDesc'
        }
      ],
      actionColumns:[
        {
          name:'Edit',
          header: 'Edit',
          onclick: (coso)=>{ console.log(coso) }
        },
        {
          name:'Delete',
          header: 'Delete',
          onclick: (coso)=>{ console.log(coso) }
        }
      ],
      dataStream: this._shipmentService.getShipments
    }
  }
  
  ngOnInit() {

  }

}
