import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { routes } from './app/app.routes';
import { JwtInterceptor } from './app/interceptors/jwt.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `
})
export class App {
  name = 'Angular Admin Dashboard';
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
}).catch(err => console.error(err));