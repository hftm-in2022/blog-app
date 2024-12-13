import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingStateService } from './core/services/loading-state.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HeaderComponent } from './core/header/header.component';
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
  #loadingService = inject(LoadingStateService);

  isLoading = this.#loadingService.state;

  login() {
    this.authStateService.authorize();
  }
  logout() {
    this.authStateService.logoff();
  }
}
