import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-iframe',
  standalone: true,
  template: `
    <div style="height: 100vh; width: 100vw; overflow: hidden;">
      <iframe 
        src="http://localhost:4201" 
        style="width:100%; height:100%; border:none;"
        title="Admin Dashboard"
      ></iframe>
    </div>
  `,
})
export class AdminDashboardIframeComponent {} 