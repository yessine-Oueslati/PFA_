import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService, Employee } from '../../services/employee.service';
import { ZoneService, Zone } from '../../services/zone.service';
import { RegionService, Region } from '../../services/region.service';
import { SecteurService, Secteur } from '../../services/secteur.service';

interface Assignment {
  type: 'zone' | 'region' | 'secteur' | null;
  id: number | null;
}

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Main Navbar -->
    <header class="main-navbar">
      <img src="https://www.ooredoo.com/wp-content/uploads/2015/12/Ooredoo-Logo_CMYK_On-White-BG_FA-01.png" alt="Ooredoo Logo" class="navbar-logo" />
      <nav class="nav-tabs">
        <button [class.active]="activeTab === 'employees'" (click)="activeTab = 'employees'">Employees</button>
        <button [class.active]="activeTab === 'zones'" (click)="activeTab = 'zones'">Zones</button>
        <button [class.active]="activeTab === 'regions'" (click)="activeTab = 'regions'">Regions</button>
        <button [class.active]="activeTab === 'secteurs'" (click)="activeTab = 'secteurs'">Secteurs</button>
        <button [class.active]="activeTab === 'logs'" (click)="activeTab = 'logs'">Logs</button>
      </nav>
    </header>

    <!-- Summary Bar -->
    <div class="summary-bar">
      <div class="summary-card">
        <span class="material-icons" style="font-size: 20px; color: #d32f2f;">people</span>
        <span class="summary-label">Employees</span>
        <span class="summary-count">{{ employees.length }}</span>
      </div>
      <div class="summary-card">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#d32f2f"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21c-4.418 0-8-4.03-8-9a8 8 0 1 1 16 0c0 4.97-3.582 9-8 9zm0-7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
        <span class="summary-label">Region</span>
        <span class="summary-count">{{ regions.length }}</span>
      </div>
      <div class="summary-card">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#d32f2f"><polygon points="12 2 22 7 12 12 2 7 12 2" stroke-width="2" stroke-linejoin="round"/><polyline points="2 17 12 22 22 17" stroke-width="2" stroke-linejoin="round"/><polyline points="2 12 12 17 22 12" stroke-width="2" stroke-linejoin="round"/></svg>
        <span class="summary-label">Sector</span>
        <span class="summary-count">{{ secteurs.length }}</span>
      </div>
      <div class="summary-card">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#d32f2f"><circle cx="12" cy="12" r="10" stroke-width="2"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" stroke-width="2" stroke-linecap="round"/></svg>
        <span class="summary-label">Zone</span>
        <span class="summary-count">{{ zones.length }}</span>
      </div>
    </div>

    <!-- Employees Tab -->
    <div *ngIf="activeTab === 'employees'">
      <div class="dashboard-header">
        <div class="search-add-row">
          <input
            type="text"
            class="search-bar"
            placeholder="Search by name or email..."
            [(ngModel)]="searchTerm"
            (input)="filterEmployees()"
          />
          <button (click)="openAddModal()" class="add-btn">
            <span class="material-icons">person_add</span>
            Add Employee
          </button>
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
              <th>Assignment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let employee of filteredEmployees">
              <td>{{ employee.id }}</td>
              <td>{{ employee.name }}</td>
              <td>{{ employee.email }}</td>
              <td>{{ employee.phone }}</td>
              <td>{{ getEmployeeAssignment(employee) }}</td>
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
              <td colspan="6" class="no-employees">No employees found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Zones Tab -->
    <div *ngIf="activeTab === 'zones'">
      <div class="search-add-row">
        <button (click)="openAddZoneModal()" class="add-btn">
          <span class="material-icons">add_location</span>
          Add Zone
        </button>
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
    </div>

    <!-- Regions Tab -->
    <div *ngIf="activeTab === 'regions'">
      <div class="search-add-row">
        <button (click)="openAddRegionModal()" class="add-btn">
          <span class="material-icons">public</span>
          Add Region
        </button>
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
    </div>

    <!-- Secteurs Tab -->
    <div *ngIf="activeTab === 'secteurs'">
      <div class="search-add-row">
        <button (click)="openAddSecteurModal()" class="add-btn">
          <span class="material-icons">layers</span>
          Add Secteur
        </button>
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

    <!-- Logs Tab -->
    <div *ngIf="activeTab === 'logs'">
      <div class="table-card">
        <h3 class="employee-table-heading">Activity Log</h3>
        <table class="employee-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let log of activityLog">
              <td>{{ log.timestamp }}</td>
              <td>{{ log.message }}</td>
            </tr>
            <tr *ngIf="activityLog.length === 0">
              <td colspan="2" class="no-employees">No activity yet.</td>
            </tr>
          </tbody>
        </table>
      </div>
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
            <label for="assignmentType">Assign To:</label>
            <select id="assignmentType" [(ngModel)]="employeeAssignment.type" name="assignmentType" required class="form-select">
              <option [ngValue]="null" disabled>Select Type</option>
              <option value="zone">Zone</option>
              <option value="region">Region</option>
              <option value="secteur">Secteur</option>
            </select>
          </div>
          <div class="form-group" *ngIf="employeeAssignment.type">
            <label for="assignmentId">Select {{ employeeAssignment.type }}:</label>
            <select id="assignmentId" [(ngModel)]="employeeAssignment.id" name="assignmentId" required class="form-select">
              <ng-container [ngSwitch]="employeeAssignment.type">
                <ng-template ngSwitchCase="zone">
                  <option *ngFor="let zone of zones" [ngValue]="zone.id">{{ zone.name }}</option>
                </ng-template>
                <ng-template ngSwitchCase="region">
                  <option *ngFor="let region of regions" [ngValue]="region.id">{{ region.name }}</option>
                </ng-template>
                <ng-template ngSwitchCase="secteur">
                  <option *ngFor="let secteur of secteurs" [ngValue]="secteur.id">{{ secteur.name }}</option>
                </ng-template>
              </ng-container>
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
  activityLog: { timestamp: string, message: string }[] = [];
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

  employeeAssignment: Assignment = { type: null, id: null };
  activeTab: 'employees' | 'zones' | 'regions' | 'secteurs' | 'logs' = 'employees';

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
      emp.email.toLowerCase().includes(term)
    );
  }

  openAddModal() {
    this.editingEmployee = null;
    this.modalEmployee = this.emptyEmployee();
    this.employeeAssignment = { type: null, id: null };
    this.isModalOpen = true;
  }

  editEmployee(employee: Employee) {
    this.editingEmployee = { ...employee };
    this.modalEmployee = { ...employee };
    this.employeeAssignment = { type: null, id: null };
    this.isModalOpen = true;
  }

  saveEmployee() {
    if (this.editingEmployee) {
      // Update logic to be implemented
      this.employeeService.updateEmployee(this.modalEmployee).subscribe({
        next: () => {
          this.fetchEmployees();
          this.showNotification('Employee updated successfully!', 'success');
          this.addLog(`Updated employee: ${this.modalEmployee.name}`);
        },
        error: () => this.showNotification('Failed to update employee.', 'error')
      });
    } else {
      // Add
      if (!this.employeeAssignment.type || !this.employeeAssignment.id) {
        this.showNotification('Please select an assignment.', 'error');
        return;
      }
      this.employeeService.addEmployee(this.modalEmployee, this.employeeAssignment as { type: string, id: number }).subscribe({
        next: () => {
          this.fetchEmployees();
          this.showNotification('Employee added successfully!', 'success');
          this.addLog(`Added employee: ${this.modalEmployee.name}`);
        },
        error: () => this.showNotification('Failed to add employee.', 'error')
      });
    }
    this.closeModal();
  }

  deleteEmployee(employee: Employee) {
    if (confirm(`Are you sure you want to delete employee ${employee.name}?`)) {
      this.employeeService.deleteEmployee(employee.id!).subscribe({
        next: () => {
          this.fetchEmployees();
          this.showNotification('Employee deleted successfully!', 'success');
          this.addLog(`Deleted employee: ${employee.name}`);
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
        this.addLog(`Added region: ${this.regionForm.name}`);
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
        this.addLog(`Added zone: ${this.zoneForm.name}`);
      },
      error: (error: any) => {
        console.error(error);
        this.showNotification('Failed to add zone.', 'error');
      },
    });
  }

  emptyEmployee(): Omit<Employee, 'id'> {
    return { name: '', email: '', phone: '' };
  }

  updateSummaryCounts() {
    // This method may need to be updated or removed if it's no longer relevant
  }

  getEmployeeAssignment(employee: Employee): string {
    if (employee.secteur) return `Secteur: ${employee.secteur.name}`;
    if (employee.region) return `Region: ${employee.region.name}`;
    if (employee.zone) return `Zone: ${employee.zone.name}`;
    return 'Unassigned';
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
        this.addLog(`Added secteur: ${this.secteurForm.name}`);
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

  addLog(message: string) {
    this.activityLog.unshift({
      timestamp: new Date().toLocaleString(),
      message
    });
    if (this.activityLog.length > 100) {
      this.activityLog.pop();
    }
  }
} 