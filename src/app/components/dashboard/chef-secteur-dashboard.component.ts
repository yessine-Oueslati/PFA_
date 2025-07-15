import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-chef-secteur-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h1>Bienvenue, Chef de Secteur!</h1>
      <p>Votre Secteur ID: <strong>{{ secteurId }}</strong></p>
      <p>Vous avez accès uniquement à votre secteur.</p>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      text-align: center;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      margin: 40px auto;
      max-width: 500px;
      border-top: 8px solid #dc3545;
    }
    h1 {
      color: #dc3545;
      margin-bottom: 16px;
    }
    strong {
      color: #dc3545;
    }
  `]
})
export class ChefSecteurDashboardComponent {
  secteurId: number | null = null;

  constructor(private authService: AuthService) {
    this.secteurId = this.authService.getSecteurId();
  }
} 