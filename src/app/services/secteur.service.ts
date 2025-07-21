import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Secteur {
  id?: number;
  name: string;
  chefSecteur: string;
  regionId: number;
  zoneId: number;
}

@Injectable({
  providedIn: 'root'
})
export class SecteurService {
  private apiServerUrl = '/api/v1/secteurs';

  constructor(private http: HttpClient) { }

  public addSecteur(secteur: Omit<Secteur, 'id'>): Observable<Secteur> {
    return this.http.post<Secteur>(`${this.apiServerUrl}/add/${secteur.regionId}/${secteur.zoneId}`, {
      name: secteur.name,
      chefSecteur: secteur.chefSecteur
    });
  }

  public getAllSecteurs(): Observable<Secteur[]> {
    return this.http.get<Secteur[]>(`${this.apiServerUrl}/all`);
  }
} 