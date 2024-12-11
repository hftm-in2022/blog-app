import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingStateService } from './core/services/loading-state.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HeaderComponent } from './core/header/header.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthStateService } from './core/auth/auth-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatProgressBarModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'blog-app';

  authStateService = inject(AuthStateService);

  #oidcSecurityService = inject(OidcSecurityService);
  #loadingService = inject(LoadingStateService);

  isLoading = this.#loadingService.state;

  login() {
    this.#oidcSecurityService.authorize();
  }
  logout() {
    this.#oidcSecurityService.logoff().subscribe((x) => console.log(x));
  }
}
