import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService, Employee } from '../../services/employee.service';
import { ZoneService, Zone } from '../../services/zone.service';
import { RegionService, Region } from '../../services/region.service';
import { SecteurService, Secteur } from '../../services/secteur.service';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="activity-log-top-card">
      <h3>Activity Log</h3>
      <ul class="activity-log-list">
        <li *ngFor="let log of activityLog">{{ log }}</li>
        <li *ngIf="activityLog.length === 0" class="no-activity">No recent activity.</li>
      </ul>
    </div>

    <div class="dashboard-main">
      <div *ngIf="notification.message" [ngClass]="{'notif-success': notification.type === 'success', 'notif-error': notification.type === 'error'}" class="notif-banner">
        {{ notification.message }}
      </div>
      <div class="dashboard-header">
        <div class="search-add-row">
          <input
            type="text"
            class="search-bar"
            placeholder="Search by name..."
            [(ngModel)]="searchTerm"
            (input)="filterEmployees()"
          />
          <button (click)="openAddModal()" class="add-btn">
            <span class="material-icons">person_add</span>
            Add Employee
          </button>
          <button (click)="openAddZoneModal()" class="add-btn">
            <span class="material-icons">add_location</span>
            Add Zone
          </button>
          <button (click)="openAddRegionModal()" class="add-btn">
            <span class="material-icons">public</span>
            Add Region
          </button>
          <button (click)="openAddSecteurModal()" class="add-btn">
            <span class="material-icons">layers</span>
            Add Secteur
          </button>
        </div>
      </div>
      <!-- Modern horizontal summary bar -->
      <div class="summary-bar">
        <div class="summary-card">
          <!-- Region: Map Pin Icon -->
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#d32f2f"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21c-4.418 0-8-4.03-8-9a8 8 0 1 1 16 0c0 4.97-3.582 9-8 9zm0-7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
          <span class="summary-label">Region</span>
          <span class="summary-count">{{ regions.length }}</span>
        </div>
        <div class="summary-card">
          <!-- Sector: Layers Icon -->
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#d32f2f"><polygon points="12 2 22 7 12 12 2 7 12 2" stroke-width="2" stroke-linejoin="round"/><polyline points="2 17 12 22 22 17" stroke-width="2" stroke-linejoin="round"/><polyline points="2 12 12 17 22 12" stroke-width="2" stroke-linejoin="round"/></svg>
          <span class="summary-label">Sector</span>
          <span class="summary-count">{{ secteurs.length }}</span>
        </div>
        <div class="summary-card">
          <!-- Zone: Globe Icon -->
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#d32f2f"><circle cx="12" cy="12" r="10" stroke-width="2"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" stroke-width="2" stroke-linecap="round"/></svg>
          <span class="summary-label">Zone</span>
          <span class="summary-count">{{ zones.length }}</span>
        </div>
        <div class="summary-card">
          <!-- Shops: Storefront Icon -->
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#d32f2f"><path d="M3 9l1.5-6h15L21 9M3 9h18M3 9l1.5 10.5A2 2 0 0 0 6.5 21h11a2 2 0 0 0 2-1.5L21 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="7" y="13" width="4" height="6" rx="1" stroke-width="2"/></svg>
          <span class="summary-label">Shops</span>
          <span class="summary-count">{{ departementCounts['Shops'] || 0 }}</span>
        </div>
      </div>
      <div class="table-card">
        <h3 class="employee-table-heading">Employee Table</h3>
        <table class="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Job Title</th>
              <th>Departement</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let employee of filteredEmployees">
              <td>{{ employee.id }}</td>
              <td>{{ employee.name }}</td>
              <td>{{ employee.email }}</td>
              <td>{{ employee.phone }}</td>
              <td>
                <span [ngClass]="getJobTitleClass(employee.jobTitle)" class="job-title-badge">
                  {{ employee.jobTitle }}
                </span>
              </td>
              <td>{{ employee.departement }}</td>
              <td>
                <button class="icon-btn edit-btn" (click)="editEmployee(employee)" title="Edit">
                  <span class="material-icons">edit</span>
                </button>
                <button class="icon-btn delete-btn" (click)="deleteEmployee(employee)" title="Delete">
                  <span class="material-icons">delete</span>
                </button>
              </td>
            </tr>
            <tr *ngIf="filteredEmployees.length === 0">
              <td colspan="7" class="no-employees">No employees found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-card">
        <h3 class="employee-table-heading">Zones Table</h3>
        <table class="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Zone Name</th>
              <th>Chef Zone</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let zone of zones">
              <td>{{ zone.id }}</td>
              <td>{{ zone.name }}</td>
              <td>{{ zone.chefZone }}</td>
            </tr>
            <tr *ngIf="zones.length === 0">
              <td colspan="3" class="no-employees">No zones found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-card">
        <h3 class="employee-table-heading">Regions Table</h3>
        <table class="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Region Name</th>
              <th>Region Head</th>
              <th>Zone</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let region of regions">
              <td>{{ region.id }}</td>
              <td>{{ region.name }}</td>
              <td>{{ region.chefRegion }}</td>
              <td>{{ getZoneName(region.zoneId ?? -1) }}</td>
            </tr>
            <tr *ngIf="regions.length === 0">
              <td colspan="4" class="no-employees">No regions found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add/Edit Modal -->
      <div *ngIf="isModalOpen" class="modal-backdrop">
        <div class="modal">
          <div class="modal-header">
            <h2>{{ editingEmployee ? 'Edit Employee' : 'Add Employee' }}</h2>
            <button (click)="closeModal()" class="close-modal" aria-label="Close">&times;</button>
          </div>
          <hr class="modal-divider" />
          <form (ngSubmit)="saveEmployee()" class="modal-form">
            <div class="form-group">
              <label for="modalName">Name:</label>
              <input id="modalName" [(ngModel)]="modalEmployee.name" name="modalName" required />
            </div>
            <div class="form-group">
              <label for="modalEmail">Email:</label>
              <input id="modalEmail" [(ngModel)]="modalEmployee.email" name="modalEmail" required />
            </div>
            <div class="form-group">
              <label for="modalPhone">Phone:</label>
              <input id="modalPhone" [(ngModel)]="modalEmployee.phone" name="modalPhone" required />
            </div>
            <div class="form-group">
              <label for="modalJobTitle">Job Title:</label>
              <select id="modalJobTitle" [(ngModel)]="modalEmployee.jobTitle" name="modalJobTitle" required class="form-select">
                <option value="">Select Job Title</option>
                <option value="Chef Departement">Chef Departement</option>
                <option value="Chef Zone">Chef Zone</option>
                <option value="Chef Region">Chef Region</option>
              </select>
            </div>
            <div class="form-group">
              <label for="modalDepartement">Departement:</label>
              <select id="modalDepartement" [(ngModel)]="modalEmployee.departement" name="modalDepartement" required class="form-select">
                <option value="">Select Departement</option>
                <option value="Customer">Customer</option>
                <option value="Region">Region</option>
                <option value="Sector">Sector</option>
                <option value="Zone">Zone</option>
              </select>
            </div>
            <div class="modal-actions">
              <button type="submit" class="save-btn">Save</button>
              <button type="button" (click)="closeModal()" class="cancel-btn">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <!-- Add Zone Modal -->
      <div *ngIf="isZoneModalOpen" class="modal-backdrop">
        <div class="modal">
          <h2>Add Zone</h2>
          <form (ngSubmit)="saveZone()" #addZoneForm="ngForm" class="modal-form">
            <div class="form-group">
              <label for="zoneName">Zone Name:</label>
              <input id="zoneName" [(ngModel)]="zoneForm.name" name="zoneName" required />
            </div>
            <div class="form-group">
              <label for="chefZone">Chef Zone:</label>
              <input id="chefZone" [(ngModel)]="zoneForm.chefZone" name="chefZone" required />
            </div>
            <div class="modal-actions">
              <button type="submit" [disabled]="!addZoneForm.valid" class="save-btn">Save</button>
              <button type="button" (click)="closeZoneModal()" class="cancel-btn">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <!-- Add Region Modal -->
      <div *ngIf="isRegionModalOpen" class="modal-backdrop">
        <div class="modal">
          <h2>Add Region</h2>
          <form (ngSubmit)="saveRegion()" #addRegionForm="ngForm" class="modal-form">
            <div class="form-group">
              <label for="regionZone">Zone:</label>
              <select id="regionZone" [(ngModel)]="regionForm.zoneId" name="regionZone" required class="form-select">
                <option [ngValue]="null" disabled>Select a Zone</option>
                <option *ngFor="let zone of zones" [value]="zone.id">{{ zone.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="regionName">Region Name:</label>
              <input id="regionName" [(ngModel)]="regionForm.name" name="regionName" required />
            </div>
            <div class="form-group">
              <label for="chefRegion">Region Head:</label>
              <input id="chefRegion" [(ngModel)]="regionForm.chefRegion" name="chefRegion" required />
            </div>
            <div class="modal-actions">
              <button type="submit" [disabled]="!addRegionForm.valid" class="save-btn">Save</button>
              <button type="button" (click)="closeRegionModal()" class="cancel-btn">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <!-- Add Secteur Modal -->
      <div *ngIf="isSecteurModalOpen" class="modal-backdrop">
        <div class="modal">
          <h2>Add Secteur</h2>
          <form (ngSubmit)="saveSecteur()" #addSecteurForm="ngForm" class="modal-form">
            <div class="form-group">
              <label for="secteurZone">Zone:</label>
              <select id="secteurZone" [(ngModel)]="secteurForm.zoneId" name="secteurZone" required class="form-select" (change)="filterRegionsByZone()">
                <option [ngValue]="null" disabled>Select a Zone</option>
                <option *ngFor="let zone of zones" [ngValue]="zone.id">{{ zone.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="secteurRegion">Region:</label>
              <select id="secteurRegion" [(ngModel)]="secteurForm.regionId" name="secteurRegion" required class="form-select">
                <option [ngValue]="null" disabled>Select a Region</option>
                <option *ngFor="let region of filteredRegions" [ngValue]="region.id">{{ region.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="secteurName">Secteur Name:</label>
              <input id="secteurName" [(ngModel)]="secteurForm.name" name="secteurName" required />
            </div>
            <div class="form-group">
              <label for="secteurHead">Secteur Head:</label>
              <input id="secteurHead" [(ngModel)]="secteurForm.chefSecteur" name="secteurHead" required />
            </div>
            <div class="modal-actions">
              <button type="submit" [disabled]="!addSecteurForm.valid" class="save-btn">Save</button>
              <button type="button" (click)="closeSecteurModal()" class="cancel-btn">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <div class="table-card">
        <h3 class="employee-table-heading">Secteurs Table</h3>
        <table class="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Secteur Name</th>
              <th>Secteur Head</th>
              <th>Region</th>
              <th>Zone</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let secteur of secteurs">
              <td>{{ secteur.id }}</td>
              <td>{{ secteur.name }}</td>
              <td>{{ secteur.chefSecteur }}</td>
              <td>{{ getRegionName(secteur.regionId) }}</td>
              <td>{{ getZoneNameById(secteur.zoneId) }}</td>
            </tr>
            <tr *ngIf="secteurs.length === 0">
              <td colspan="5" class="no-employees">No secteurs found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {
  notification = { message: '', type: '' };
  notifTimeout: any;
  departementCounts: { [key: string]: number } = {};
  adminCount: number = 0;
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm: string = '';
  activityLog: string[] = [];
  zones: Zone[] = [];
  regions: Region[] = [];
  secteurs: Secteur[] = [];

  isModalOpen = false;
  editingEmployee: Employee | null = null;
  modalEmployee: Employee = this.emptyEmployee();

  // Modal state for zone
  isZoneModalOpen = false;
  zoneForm: { name: string; chefZone: string } = { name: '', chefZone: '' };

  // Modal state for region
  isRegionModalOpen = false;
  regionForm = { zoneId: null, name: '', chefRegion: '' };

  // Modal state for secteur
  isSecteurModalOpen = false;
  secteurForm = { zoneId: null, regionId: null, name: '', chefSecteur: '' };
  filteredRegions: Region[] = [];

  constructor(
    private employeeService: EmployeeService,
    private zoneService: ZoneService,
    private regionService: RegionService,
    private secteurService: SecteurService
  ) {}

  ngOnInit() {
    this.fetchEmployees();
    this.fetchZones();
    this.fetchRegions();
    this.fetchSecteurs();
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notification = { message, type };
    if (this.notifTimeout) clearTimeout(this.notifTimeout);
    this.notifTimeout = setTimeout(() => {
      this.notification = { message: '', type: '' };
    }, 3000);
  }

  fetchEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: employees => {
        this.employees = employees;
        this.filterEmployees();
        this.updateSummaryCounts();
      },
      error: () => this.showNotification('Failed to load employees.', 'error')
    });
  }

  filterEmployees() {
    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp =>
      emp.name.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      emp.jobTitle.toLowerCase().includes(term) ||
      emp.departement.toLowerCase().includes(term)
    );
  }

  openAddModal() {
    this.editingEmployee = null;
    this.modalEmployee = this.emptyEmployee();
    this.isModalOpen = true;
  }

  editEmployee(employee: Employee) {
    this.editingEmployee = { ...employee };
    this.modalEmployee = { ...employee };
    this.isModalOpen = true;
  }

  saveEmployee() {
    if (this.editingEmployee) {
      // Update
      this.employeeService.updateEmployee(this.modalEmployee).subscribe({
        next: () => {
          this.isModalOpen = false;
          this.fetchEmployees();
          this.showNotification('Employee updated successfully!', 'success');
          this.addActivity(`Employee ${this.modalEmployee.name} updated at ${new Date().toLocaleTimeString()}`);
        },
        error: () => this.showNotification('Failed to update employee.', 'error')
      });
    } else {
      // Add
      this.employeeService.addEmployee(this.modalEmployee).subscribe({
        next: () => {
          this.isModalOpen = false;
          this.fetchEmployees();
          this.showNotification('Employee added successfully!', 'success');
          this.addActivity(`Employee ${this.modalEmployee.name} added at ${new Date().toLocaleTimeString()}`);
        },
        error: () => this.showNotification('Failed to add employee.', 'error')
      });
    }
  }

  deleteEmployee(employee: Employee) {
    if (confirm(`Are you sure you want to delete employee ${employee.name}?`)) {
      this.employeeService.deleteEmployee(employee.id!).subscribe({
        next: () => {
          this.fetchEmployees();
          this.showNotification('Employee deleted successfully!', 'success');
          this.addActivity(`Employee ${employee.name} deleted at ${new Date().toLocaleTimeString()}`);
        },
        error: () => this.showNotification('Failed to delete employee.', 'error')
      });
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingEmployee = null;
  }

  openAddZoneModal() {
    this.zoneForm = { name: '', chefZone: '' };
    this.isZoneModalOpen = true;
  }

  closeZoneModal() {
    this.isZoneModalOpen = false;
  }

  openAddRegionModal() {
    this.regionForm = { zoneId: null, name: '', chefRegion: '' };
    this.isRegionModalOpen = true;
  }

  closeRegionModal() {
    this.isRegionModalOpen = false;
  }

  saveRegion() {
    if (!this.regionForm.zoneId) {
      this.showNotification('Please select a zone.', 'error');
      return;
    }
    const regionData = {
      name: this.regionForm.name,
      chefRegion: this.regionForm.chefRegion,
      zoneId: this.regionForm.zoneId
    };

    this.regionService.addRegion(regionData).subscribe({
      next: (response) => {
        console.log(response);
        this.showNotification('Region added successfully!', 'success');
        this.fetchRegions();
        this.closeRegionModal();
      },
      error: (error) => {
        console.error(error);
        this.showNotification('Failed to add region.', 'error');
      }
    });
  }

  saveZone() {
    this.zoneService.addZone(this.zoneForm as Zone).subscribe({
      next: (response: Zone) => {
        console.log(response);
        this.showNotification('Zone added successfully!', 'success');
        this.closeZoneModal();
        // Optionally, you can refresh or update a list of zones here
        this.fetchZones();
      },
      error: (error: any) => {
        console.error(error);
        this.showNotification('Failed to add zone.', 'error');
      },
    });
  }

  emptyEmployee(): Employee {
    return { id: undefined, name: '', email: '', phone: '', jobTitle: '', departement: '' };
  }

  updateSummaryCounts() {
    this.departementCounts = { Customer: 0, Region: 0, Sector: 0, Zone: 0 };
    this.adminCount = 0;
    for (const emp of this.employees) {
      if (emp.departement && this.departementCounts.hasOwnProperty(emp.departement)) {
        this.departementCounts[emp.departement]++;
      }
      // If you have a role property, count admins here. Placeholder:
      if ((emp as any).role === 'ADMIN') this.adminCount++;
    }
  }

  getJobTitleClass(jobTitle: string): string {
    switch (jobTitle) {
      case 'Chef Departement':
        return 'job-title-badge-chef-departement';
      case 'Chef Zone':
        return 'job-title-badge-chef-zone';
      case 'Chef Region':
        return 'job-title-badge-chef-region';
      default:
        return '';
    }
  }

  addActivity(message: string) {
    this.activityLog.unshift(message);
    if (this.activityLog.length > 10) {
      this.activityLog.pop();
    }
  }

  fetchZones() {
    this.zoneService.getAllZones().subscribe({
      next: (zones) => this.zones = zones,
      error: () => this.showNotification('Failed to load zones.', 'error')
    });
  }

  fetchRegions() {
    this.regionService.getAllRegions().subscribe({
      next: (regions) => {
        // Map zone object to zoneId for each region
        this.regions = regions.map(region => ({
          ...region,
          zoneId: region.zone?.id
        }));
      },
      error: () => this.showNotification('Failed to load regions.', 'error')
    });
  }

  getZoneName(zoneId: number): string {
    const zone = this.zones.find(z => z.id === zoneId);
    return zone ? zone.name : 'N/A';
  }

  openAddSecteurModal() {
    this.secteurForm = { zoneId: null, regionId: null, name: '', chefSecteur: '' };
    this.filteredRegions = [];
    this.isSecteurModalOpen = true;
  }

  closeSecteurModal() {
    this.isSecteurModalOpen = false;
  }

  filterRegionsByZone() {
    this.filteredRegions = this.regions.filter(r => r.zoneId === this.secteurForm.zoneId);
    this.secteurForm.regionId = null;
  }

  saveSecteur() {
    if (!this.secteurForm.zoneId || !this.secteurForm.regionId) {
      this.showNotification('Please select a zone and region.', 'error');
      return;
    }
    const secteurData = {
      name: this.secteurForm.name,
      chefSecteur: this.secteurForm.chefSecteur,
      regionId: this.secteurForm.regionId,
      zoneId: this.secteurForm.zoneId
    };
    this.secteurService.addSecteur(secteurData).subscribe({
      next: (response) => {
        this.showNotification('Secteur added successfully!', 'success');
        this.fetchSecteurs();
        this.closeSecteurModal();
      },
      error: (error) => {
        this.showNotification('Failed to add secteur.', 'error');
      }
    });
  }

  fetchSecteurs() {
    this.secteurService.getAllSecteurs().subscribe({
      next: (secteurs) => this.secteurs = secteurs,
      error: () => this.showNotification('Failed to load secteurs.', 'error')
    });
  }

  getRegionName(regionId: number): string {
    const region = this.regions.find(r => r.id === regionId);
    return region ? region.name : 'N/A';
  }

  getZoneNameById(zoneId: number): string {
    const zone = this.zones.find(z => z.id === zoneId);
    return zone ? zone.name : 'N/A';
  }
} 