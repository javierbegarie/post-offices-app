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

  /* populate selects */
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

    let typeControl = this.shipmentForm.get('type');
    let weightControl = this.shipmentForm.get('weight');

    if(id){
      this._shipmentService.getShipment(id).subscribe(shipment=>{
        this.isNew = false;
        this.shipment= <Shipment> shipment;
        typeControl.setValue(this.shipment.type);
        weightControl.setValue(this.shipment.weight);
        this.shipmentForm.get('status').setValue(this.shipment.status);
        this.shipmentForm.get('office').setValue(this.shipment.office.id);
      });
    }

    this._officeService.getOffices().subscribe(offices=>{
      this.offices = offices;
    });

    /* Letter shouldn't weight too much */
    typeControl.valueChanges.subscribe((newValue)=>{
      if(newValue === ShipmentType.LETTER){
        weightControl.setValue(ShipmentWeight.LIGHT);
        weightControl.disable()
      } else{
        weightControl.enable();
      }
    });
  }

  onSubmit() {
    if(this.isNew){
      this.createShipment();
    }else{
      this.updateShipment();
    }
  }

  private createShipment(){
    /* Using Raw Value in case weight control is disabled */
    let { office ,type ,status ,weight } = this.shipmentForm.getRawValue()
    office = this.offices.filter(o=>o.id===office)[0];
    this._shipmentService.postShipment(type,status,weight,office)
    .subscribe(()=>{
      this._snackBar.open(`New shipment created successfully`, null ,{duration: 1000});
      this.shipmentForm.reset();
    });
  }

  private updateShipment(){
    let { type, status, weight, office } = this.shipmentForm.getRawValue()
    office = this.offices.filter(o=>o.id===office)[0];
    let shipment = new Shipment(this.shipment.id,type,status,weight,'',office);
    this._shipmentService.updateShipment(shipment)
    .subscribe(()=>{
      this._snackBar.open(`Shipment updated successfully`, null ,{duration: 1000});
    });
  }
}
