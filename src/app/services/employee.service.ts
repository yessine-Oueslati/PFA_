import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zone } from './zone.service';
import { Region } from './region.service';
import { Secteur } from './secteur.service';

export interface Employee {
  id?: number;
  name: string;
  email: string;
  phone: string;
  secteur?: Secteur;
  region?: Region;
  zone?: Zone;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiUrl = '/api/employees';

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/all`);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/find/${id}`);
  }


  addEmployee(employee: Omit<Employee, 'id'>, assignment: { type: string, id: number }): Observable<Employee> {
    let params = new HttpParams();
    if (assignment.type === 'zone') params = params.set('zoneId', assignment.id.toString());
    if (assignment.type === 'region') params = params.set('regionId', assignment.id.toString());
    if (assignment.type === 'secteur') params = params.set('secteurId', assignment.id.toString());

    return this.http.post<Employee>(`${this.apiUrl}/add`, employee, { params });
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/update`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
} 