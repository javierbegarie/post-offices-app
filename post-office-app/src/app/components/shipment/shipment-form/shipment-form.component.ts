import { Component, OnInit } from '@angular/core';
import { ShipmentService } from '../../../services/shipment.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ShipmentWeight } from '../../../model/shipment-weight';
import { ShipmentType } from '../../../model/shipment-type';
import { ShipmentStatus } from '../../../model/shipment-status';
import Office from '../../../model/office';
import { OfficeService } from '../../../services/office.service';
import { ActivatedRoute } from '@angular/router';
import Shipment from '../../../model/shipment';

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

  isNew = true;
  shipment:Shipment = null;

  constructor(
    private _fb: FormBuilder, 
    private _shipmentService: ShipmentService,
    private _officeService: OfficeService,
    private _snackBar: MatSnackBar,
    private _route:ActivatedRoute) { }

  ngOnInit() {
    let id = this._route.snapshot.paramMap.get('id');

    if(id){
      this._shipmentService.getShipment(id).subscribe(shipment=>{
        this.isNew = false;
        this.shipment= <Shipment> shipment;
        this.shipmentForm.get('type').setValue(this.shipment.type);
        this.shipmentForm.get('weight').setValue(this.shipment.weight);
        this.shipmentForm.get('status').setValue(this.shipment.status);
        this.shipmentForm.get('office').setValue(this.shipment.office.id);
      });
    }

    this._officeService.getOffices().subscribe(offices=>{
      this.offices = offices;
    });
  }

  onSubmit() {
    if(this.isNew){
      this.createShipment();
    }else{
      this.updateShipment();
    }
  }

  createShipment(){
    let shipment = this.shipmentForm.value;
    let office = this.offices.filter(office=>office.id===shipment.office)[0];
    this._shipmentService.postShipment(shipment.type,shipment.status,shipment.weight,office)
    .subscribe(()=>{
      this._snackBar.open(`New shipment created successfully`, null ,{duration: 1000});
      this.shipmentForm.reset();
    });
  }

  updateShipment(){
    let value = this.shipmentForm.value;
    let office = this.offices.filter(office=>office.id===value.office)[0];
    let shipment = new Shipment(this.shipment.id,value.type,value.status,value.weight,'',office);
    this._shipmentService.updateShipment(shipment)
    .subscribe(()=>{
      this._snackBar.open(`Office ${office.name} updated successfully`, null ,{duration: 1000});
    });
  }
}
