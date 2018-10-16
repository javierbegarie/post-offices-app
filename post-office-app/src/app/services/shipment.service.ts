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

  public getShipments = ()=>{
    return this._http.get<Shipment[]>(`${this.baseUrl}/shipment/list`);
  };
}
