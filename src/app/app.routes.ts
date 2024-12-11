import { ResolveFn, Routes } from '@angular/router';
import {
  BlogBackendService,
  Entries,
} from './core/services/blog-backend.service';
import { inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { isAuthenticatedGuard } from './core/auth/auth-guard';

export const entriesResolver: ResolveFn<Entries> = async () => {
  const blogBackendService = inject(BlogBackendService);
  return await lastValueFrom(blogBackendService.getBlogPosts());
};

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    loadComponent: () =>
      import('./features/blog-overview-page/blog-overview-page.component').then(
        (c) => c.BlogOverviewPageComponent,
      ),
    resolve: { model: entriesResolver },
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./features/blog-detail-page/blog-detail-page.component').then(
        (c) => c.BlogDetailPageComponent,
      ),
  },
  {
    path: 'add-blog',
    loadComponent: () =>
      import('./features/add-blog-page/add-blog-page.component').then(
        (c) => c.AddBlogPageComponent,
      ),
    canActivate: [isAuthenticatedGuard],
  },
];
