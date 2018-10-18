import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import Shipment from '../model/shipment';
import { ShipmentType } from '../model/shipment-type';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private baseUrl = environment.server.baseUrl;
  constructor(private _http: HttpClient) { }

  public getPackages = ()=>{
    return this.getShipments()
          .pipe( map((shipments)=>shipments.filter(s=>s.type===ShipmentType.PACKAGE)));
  };

  public getShipment = (id)=>{
    return this._http.post(`${this.baseUrl}/shipment/get`,{id});
  }

  public getShipments = ()=>{
    return this._http.get<Shipment[]>(`${this.baseUrl}/shipment/list`);
  };

  public postShipment = (type,status,weight,office) => {
    return this._http.post(`${this.baseUrl}/shipment/add`,{type,status,weight,office});
  }

  public updateShipment = (shipment:Shipment) => {
    /* HttpClient sends private attributes (_name) instead of accesors (name).
       Using payload as an easy fix.
    */
    let payload = {
      id: shipment.id,
      type: shipment.type,
      status: shipment.status,
      weight: shipment.weight,
      office: {
        id: shipment.office.id,
        PLZ: shipment.office.PLZ,
        name: shipment.office.name
      }
    };
    return this._http.post(`${this.baseUrl}/shipment/update`,payload);
  }

  public deleteShipment = (shipment:Shipment) => {
    return this._http.post(`${this.baseUrl}/shipment/delete`,{id:shipment.id});
  }
}
