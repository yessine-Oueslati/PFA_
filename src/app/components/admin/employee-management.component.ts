import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService, Employee } from '../../services/employee.service';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-dashboard-container">
      <div *ngIf="notification.message" [ngClass]="{'notif-success': notification.type === 'success', 'notif-error': notification.type === 'error'}" class="notif-banner">
        {{ notification.message }}
      </div>
      <div class="dashboard-header">
        <input
          type="text"
          class="search-bar"
          placeholder="Search by name..."
          [(ngModel)]="searchTerm"
          (input)="filterEmployees()"
        />
        <button (click)="openAddModal()" class="add-btn">
          <span style="display: flex; align-items: center; gap: 8px;">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="vertical-align: middle;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Add Employee
          </span>
        </button>
      </div>
      <!-- Modern horizontal summary bar -->
      <div class="summary-bar">
        <div class="summary-card">
          <!-- Region: Map Pin Icon -->
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#d32f2f"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21c-4.418 0-8-4.03-8-9a8 8 0 1 1 16 0c0 4.97-3.582 9-8 9zm0-7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
          <span class="summary-label">Region</span>
          <span class="summary-count">{{ departementCounts['Region'] || 0 }}</span>
        </div>
        <div class="summary-card">
          <!-- Sector: Layers Icon -->
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#d32f2f"><polygon points="12 2 22 7 12 12 2 7 12 2" stroke-width="2" stroke-linejoin="round"/><polyline points="2 17 12 22 22 17" stroke-width="2" stroke-linejoin="round"/><polyline points="2 12 12 17 22 12" stroke-width="2" stroke-linejoin="round"/></svg>
          <span class="summary-label">Sector</span>
          <span class="summary-count">{{ departementCounts['Sector'] || 0 }}</span>
        </div>
        <div class="summary-card">
          <!-- Zone: Globe Icon -->
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#d32f2f"><circle cx="12" cy="12" r="10" stroke-width="2"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" stroke-width="2" stroke-linecap="round"/></svg>
          <span class="summary-label">Zone</span>
          <span class="summary-count">{{ departementCounts['Zone'] || 0 }}</span>
        </div>
        <div class="summary-card">
          <!-- Shops: Storefront Icon -->
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#d32f2f"><path d="M3 9l1.5-6h15L21 9M3 9h18M3 9l1.5 10.5A2 2 0 0 0 6.5 21h11a2 2 0 0 0 2-1.5L21 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="7" y="13" width="4" height="6" rx="1" stroke-width="2"/></svg>
          <span class="summary-label">Shops</span>
          <span class="summary-count">{{ departementCounts['Shops'] || 0 }}</span>
        </div>
      </div>
      <div class="table-container">
        <table class="user-table">
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
              <td>{{ employee.jobTitle }}</td>
              <td>{{ employee.departement }}</td>
              <td>
                <button class="edit-btn" (click)="editEmployee(employee)">Edit</button>
                <button class="delete-btn" (click)="deleteEmployee(employee)">Delete</button>
              </td>
            </tr>
            <tr *ngIf="filteredEmployees.length === 0">
              <td colspan="7" class="no-employees">No employees found.</td>
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

  isModalOpen = false;
  editingEmployee: Employee | null = null;
  modalEmployee: Employee = this.emptyEmployee();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.fetchEmployees();
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
        },
        error: () => this.showNotification('Failed to delete employee.', 'error')
      });
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingEmployee = null;
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
} 