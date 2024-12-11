import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginResponse } from 'angular-auth-oidc-client';
import { hasRole } from '../auth/jwt';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary" class="header-toolbar">
      <span>Blog App</span>
      <span class="spacer"></span>

      @if (canAddBlogs()) {
        <button
          class="add-blog"
          mat-raised-button
          color="accent"
          routerLink="/add-blog"
        >
          Neuen Blog erstellen
        </button>
      }

      @if (loginState()?.isAuthenticated) {
        <button mat-raised-button color="accent" (click)="logout.emit()">
          Logout
        </button>
      } @else {
        <button mat-raised-button color="accent" (click)="login.emit()">
          Login
        </button>
      }
    </mat-toolbar>
  `,
  styles: [
    `
      .header-toolbar {
        display: flex;
        justify-content: space-between;
        padding: 0 16px;

        .add-blog {
          margin: 80px !important;
        }
      }
      .spacer {
        flex: 1;
      }
    `,
  ],
  imports: [MatToolbarModule, MatButtonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  login = output();
  logout = output();
  loginState = input<LoginResponse>();

  canAddBlogs = computed(() => hasRole('user', this.loginState()?.accessToken));
}
