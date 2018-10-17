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

  public postOffice = (PLZ,name) => {
    return this._http.post(`${this.baseUrl}/office/add`,{PLZ,name});
  }

  public updateOffice = (office:Office) => {
    return this._http.post(`${this.baseUrl}/office/update`,office);
  }

  public deleteOffice = (office:Office) => {
    return this._http.post(`${this.baseUrl}/office/delte`,office);
  }
}
