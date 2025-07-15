import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserRole, CreateUserRequest, UpdateUserRequest } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" (click)="closeModal()"></div>
      
      <!-- Modal -->
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="w-full mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {{ editingUser ? 'Edit User' : 'Add New User' }}
                  </h3>
                  
                  <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input 
                          type="text" 
                          formControlName="firstName"
                          class="input-field"
                          placeholder="Enter first name"
                        />
                        <div *ngIf="userForm.get('firstName')?.invalid && userForm.get('firstName')?.touched" 
                             class="mt-1 text-sm text-red-600">
                          First name is required
                        </div>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input 
                          type="text" 
                          formControlName="lastName"
                          class="input-field"
                          placeholder="Enter last name"
                        />
                        <div *ngIf="userForm.get('lastName')?.invalid && userForm.get('lastName')?.touched" 
                             class="mt-1 text-sm text-red-600">
                          Last name is required
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        formControlName="email"
                        class="input-field"
                        placeholder="Enter email address"
                      />
                      <div *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched" 
                           class="mt-1 text-sm text-red-600">
                        <span *ngIf="userForm.get('email')?.errors?.['required']">Email is required</span>
                        <span *ngIf="userForm.get('email')?.errors?.['email']">Please enter a valid email</span>
                      </div>
                    </div>
                    
                    <div *ngIf="!editingUser">
                      <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <input 
                        type="password" 
                        formControlName="password"
                        class="input-field"
                        placeholder="Enter password"
                      />
                      <div *ngIf="userForm.get('password')?.invalid && userForm.get('password')?.touched" 
                           class="mt-1 text-sm text-red-600">
                        Password is required
                      </div>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <select formControlName="role" class="input-field">
                        <option value="">Select a role</option>
                        <option value="ADMIN">Admin</option>
                        <option value="CHEF_SECTEUR">Chef Secteur</option>
                        <option value="CHEF_ZONE">Chef Zone</option>
                        <option value="CHEF_REGION">Chef Region</option>
                      </select>
                      <div *ngIf="userForm.get('role')?.invalid && userForm.get('role')?.touched" 
                           class="mt-1 text-sm text-red-600">
                        Role is required
                      </div>
                    </div>
                    
                    <!-- Conditional fields based on role -->
                    <div *ngIf="userForm.get('role')?.value === 'CHEF_SECTEUR'">
                      <label class="block text-sm font-medium text-gray-700 mb-1">Secteur</label>
                      <select formControlName="secteur" class="input-field">
                        <option value="">Select a secteur</option>
                        <option *ngFor="let secteur of secteurs" [value]="secteur">{{ secteur }}</option>
                      </select>
                    </div>
                    
                    <div *ngIf="userForm.get('role')?.value === 'CHEF_ZONE'">
                      <label class="block text-sm font-medium text-gray-700 mb-1">Zone</label>
                      <select formControlName="zone" class="input-field">
                        <option value="">Select a zone</option>
                        <option *ngFor="let zone of zones" [value]="zone">{{ zone }}</option>
                      </select>
                    </div>
                    
                    <div *ngIf="userForm.get('role')?.value === 'CHEF_REGION'">
                      <label class="block text-sm font-medium text-gray-700 mb-1">Region</label>
                      <select formControlName="region" class="input-field">
                        <option value="">Select a region</option>
                        <option *ngFor="let region of regions" [value]="region">{{ region }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button 
                type="submit"
                [disabled]="userForm.invalid || isSubmitting"
                class="btn-primary w-full sm:w-auto sm:ml-3"
              >
                <span *ngIf="isSubmitting" class="inline-flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ editingUser ? 'Updating...' : 'Creating...' }}
                </span>
                <span *ngIf="!isSubmitting">{{ editingUser ? 'Update User' : 'Create User' }}</span>
              </button>
              <button 
                type="button"
                (click)="closeModal()"
                class="btn-secondary w-full sm:w-auto mt-3 sm:mt-0"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class AddUserModalComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() editingUser: User | null = null;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() userCreated = new EventEmitter<User>();
  @Output() userUpdated = new EventEmitter<User>();

  userForm: FormGroup;
  isSubmitting = false;
  secteurs: string[] = [];
  zones: string[] = [];
  regions: string[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
      secteur: [''],
      zone: [''],
      region: ['']
    });
  }

  ngOnInit() {
    this.loadDropdownData();
  }

  ngOnChanges() {
    if (this.editingUser) {
      this.userForm.patchValue({
        firstName: this.editingUser.firstName,
        lastName: this.editingUser.lastName,
        email: this.editingUser.email,
        role: this.editingUser.role,
        secteur: this.editingUser.secteur || '',
        zone: this.editingUser.zone || '',
        region: this.editingUser.region || ''
      });
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    } else {
      this.userForm.reset();
      this.userForm.get('password')?.setValidators([Validators.required]);
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  loadDropdownData() {
    this.userService.getSecteurs().subscribe(secteurs => this.secteurs = secteurs);
    this.userService.getZones().subscribe(zones => this.zones = zones);
    this.userService.getRegions().subscribe(regions => this.regions = regions);
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      const formValue = this.userForm.value;
      
      if (this.editingUser) {
        const updateRequest: UpdateUserRequest = {
          firstName: formValue.firstName,
          lastName: formValue.lastName,
          email: formValue.email,
          role: formValue.role,
          secteur: formValue.role === UserRole.CHEF_SECTEUR ? formValue.secteur : undefined,
          zone: formValue.role === UserRole.CHEF_ZONE ? formValue.zone : undefined,
          region: formValue.role === UserRole.CHEF_REGION ? formValue.region : undefined
        };

        this.userService.updateUser(this.editingUser.id, updateRequest).subscribe({
          next: (user) => {
            this.userUpdated.emit(user);
            this.closeModal();
            this.isSubmitting = false;
          },
          error: () => {
            this.isSubmitting = false;
          }
        });
      } else {
        const createRequest: CreateUserRequest = {
          firstName: formValue.firstName,
          lastName: formValue.lastName,
          email: formValue.email,
          password: formValue.password,
          role: formValue.role,
          secteur: formValue.role === UserRole.CHEF_SECTEUR ? formValue.secteur : undefined,
          zone: formValue.role === UserRole.CHEF_ZONE ? formValue.zone : undefined,
          region: formValue.role === UserRole.CHEF_REGION ? formValue.region : undefined
        };

        this.userService.createUser(createRequest).subscribe({
          next: (user) => {
            this.userCreated.emit(user);
            this.closeModal();
            this.isSubmitting = false;
          },
          error: () => {
            this.isSubmitting = false;
          }
        });
      }
    }
  }

  closeModal() {
    this.isOpen = false;
    this.editingUser = null;
    this.userForm.reset();
    this.closeModalEvent.emit();
  }
}