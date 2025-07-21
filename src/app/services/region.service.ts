import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Region {
  id?: number;
  name: string;
  chefRegion: string;
  zoneId: number;
}

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiServerUrl = '/api/v1/regions';

  constructor(private http: HttpClient) { }

  public addRegion(region: Omit<Region, 'id'>): Observable<Region> {
    return this.http.post<Region>(`${this.apiServerUrl}/add/${region.zoneId}`, {
      name: region.name,
      chefRegion: region.chefRegion
    });
  }

  public getAllRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.apiServerUrl}/all`);
  }
} 