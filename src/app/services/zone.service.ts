import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Zone {
  id?: number;
  name: string;
  chefZone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  private apiServerUrl = '/api/v1/zones';

  constructor(private http: HttpClient) { }

  public addZone(zone: Zone): Observable<Zone> {
    return this.http.post<Zone>(`${this.apiServerUrl}/add`, zone);
  }

  public getAllZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(`${this.apiServerUrl}/all`);
  }
} 