import { Component, OnInit } from '@angular/core';
import { ShipmentService } from '../../../services/shipment.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ShipmentWeight } from '../../../model/shipment-weight';
import { ShipmentType } from '../../../model/shipment-type';
import { ShipmentStatus } from '../../../model/shipment-status';
import Office from '../../../model/office';
import { OfficeService } from '../../../services/office.service';

@Component({
  selector: 'app-shipment-form',
  templateUrl: './shipment-form.component.html',
  styleUrls: ['./shipment-form.component.css']
})
export class ShipmentFormComponent implements OnInit {

  shipmentForm = this._fb.group({
    type: ['', 
      Validators.required
    ],
    weight: ['',
      Validators.required
    ],
    status: ['',
      Validators.required
    ],
    office: ['',
      Validators.required
    ]
  });

  weights = Object.values(ShipmentWeight);
  types = Object.values(ShipmentType);
  statuses = Object.values(ShipmentStatus);
  offices: Office[] = [];

  constructor(
    private _fb: FormBuilder, 
    private _shipmentService: ShipmentService,
    private _officeService: OfficeService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this._officeService.getOffices().subscribe(offices=>{
      this.offices = offices;
    });
  }

  onSubmit() {
    let shipment = this.shipmentForm.value;
    this._shipmentService.postShipment(shipment.type,shipment.status,shipment.weight,shipment.office)
    .subscribe(()=>{
      this._snackBar.open(`New shipment created successfully`, null ,{duration: 1000});
      this.shipmentForm.reset();
    });
  }
}
