import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Office from '../model/office';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  private baseUrl = environment.server.baseUrl;
  constructor(private _http: HttpClient) { }

  public getOffices = ()=>{
    return this._http.get<Office[]>(`${this.baseUrl}/office/list`);
  }

  public getOffice = (id)=>{
    return this._http.post(`${this.baseUrl}/office/get`,{id});
  }

  public postOffice = (PLZ,name) => {
    return this._http.post(`${this.baseUrl}/office/add`,{PLZ,name});
  }

  public updateOffice = (office:Office) => {
    /* HttpClient sends private attributes (_name) instead of accesors (name).
       Using payload as an easy fix.
    */
    let payload = {
      id: office.id,
      name: office.name,
      PLZ: office.PLZ
    }
    return this._http.post(`${this.baseUrl}/office/update`,payload);
  }

  public deleteOffice = (office:Office) => {
    return this._http.post(`${this.baseUrl}/office/delete`,{id:office.id});
  }
}
