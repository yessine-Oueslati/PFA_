import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User, UserRole, CreateUserRequest, UpdateUserRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  private mockUsers: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: UserRole.ADMIN
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      role: UserRole.CHEF_SECTEUR,
      secteur: 'Finance'
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@example.com',
      role: UserRole.CHEF_ZONE,
      zone: 'North Zone'
    },
    {
      id: 4,
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.williams@example.com',
      role: UserRole.CHEF_REGION,
      region: 'Europe'
    },
    {
      id: 5,
      firstName: 'Robert',
      lastName: 'Brown',
      email: 'robert.brown@example.com',
      role: UserRole.CHEF_SECTEUR,
      secteur: 'Marketing'
    },
    {
      id: 6,
      firstName: 'Lisa',
      lastName: 'Davis',
      email: 'lisa.davis@example.com',
      role: UserRole.CHEF_ZONE,
      zone: 'South Zone'
    },
    {
      id: 7,
      firstName: 'David',
      lastName: 'Miller',
      email: 'david.miller@example.com',
      role: UserRole.CHEF_REGION,
      region: 'Asia Pacific'
    },
    {
      id: 8,
      firstName: 'Emma',
      lastName: 'Wilson',
      email: 'emma.wilson@example.com',
      role: UserRole.ADMIN
    }
  ];

  constructor() {
    this.usersSubject.next(this.mockUsers);
  }

  getUsers(): Observable<User[]> {
    return this.users$.pipe(delay(300)); // Simulate API delay
  }

  createUser(user: CreateUserRequest): Observable<User> {
    return of(null).pipe(
      delay(500),
      map(() => {
        const newUser: User = {
          id: Math.max(...this.mockUsers.map(u => u.id)) + 1,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          secteur: user.secteur,
          zone: user.zone,
          region: user.region
        };
        this.mockUsers.push(newUser);
        this.usersSubject.next([...this.mockUsers]);
        return newUser;
      })
    );
  }

  updateUser(id: number, user: UpdateUserRequest): Observable<User> {
    return of(null).pipe(
      delay(500),
      map(() => {
        const index = this.mockUsers.findIndex(u => u.id === id);
        if (index !== -1) {
          this.mockUsers[index] = {
            ...this.mockUsers[index],
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            secteur: user.secteur,
            zone: user.zone,
            region: user.region
          };
          this.usersSubject.next([...this.mockUsers]);
          return this.mockUsers[index];
        }
        throw new Error('User not found');
      })
    );
  }

  deleteUser(id: number): Observable<void> {
    return of(null).pipe(
      delay(500),
      map(() => {
        const index = this.mockUsers.findIndex(u => u.id === id);
        if (index !== -1) {
          this.mockUsers.splice(index, 1);
          this.usersSubject.next([...this.mockUsers]);
        }
      })
    );
  }

  // Mock data for dropdowns
  getSecteurs(): Observable<string[]> {
    return of(['Finance', 'Marketing', 'HR', 'IT', 'Operations', 'Sales']);
  }

  getZones(): Observable<string[]> {
    return of(['North Zone', 'South Zone', 'East Zone', 'West Zone', 'Central Zone']);
  }

  getRegions(): Observable<string[]> {
    return of(['Europe', 'Asia Pacific', 'North America', 'South America', 'Africa', 'Middle East']);
  }
}