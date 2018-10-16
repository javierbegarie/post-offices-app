import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Shipment from '../model/shipment';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private baseUrl = environment.server.baseUrl;
  constructor(private _http: HttpClient) { }

  public getPackages = ()=>{
    return this._http.get<Shipment[]>(`${this.baseUrl}/shipment/list`);
  };

  public getShipments = ()=>{
    return this._http.get<Shipment[]>(`${this.baseUrl}/shipment/list`);
  };
}
