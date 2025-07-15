export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  secteur?: string;
  zone?: string;
  region?: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  CHEF_SECTEUR = 'CHEF_SECTEUR',
  CHEF_ZONE = 'CHEF_ZONE',
  CHEF_REGION = 'CHEF_REGION'
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  secteur?: string;
  zone?: string;
  region?: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  secteur?: string;
  zone?: string;
  region?: string;
}