import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSearchTableConfig, DataSearchTablePipe, DataSearchTableComponent } from '../../shared/data-search-table/data-search-table.component';
import Shipment from '../../../model/shipment';
import { ShipmentService } from '../../../services/shipment.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DeleteConfirmDialogComponent } from '../../shared/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.css']
})
export class ShipmentListComponent implements OnInit {

  shipmentsTableConfig: DataSearchTableConfig<Shipment>;
  @ViewChild(DataSearchTableComponent) dataTable: DataSearchTableComponent<Shipment>;

  constructor(
    private _shipmentService:ShipmentService,
    private _router: Router,
    public dialog: MatDialog) {

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
        },
        {
          name: 'office',
          header: 'Office',
          property: 'office',
          pipe: DataSearchTablePipe.FLATTEN
        }
      ],
      actionColumns:[
        {
          name:'Edit',
          header: 'Edit',
          onclick: this.editShipment
        },
        {
          name:'Delete',
          header: 'Delete',
          onclick: this.deleteShipment
        }
      ],
      dataStream: this._shipmentService.getShipments
    }
  }
  
  editShipment = (shipment:Shipment)=>{
    this._router.navigate([`shipments/update/${shipment.id}`]);
  }

  deleteShipment = (shipment:Shipment)=>{

    const dialogConfig = {
      width: '350px',
      data: {header:'Shipment',text: ` this shipment `}
    };

    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent,dialogConfig);
    
    dialogRef.afterClosed().subscribe(confirm => {
      if(confirm === true) {
        this._shipmentService.deleteShipment(shipment).subscribe(()=>{
            this.dataTable.refreshList();
        });
      }
    });
  }

  ngOnInit() {

  }

}
