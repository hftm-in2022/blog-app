import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  BlogBackendService,
  CreatedBlog,
} from '../../../core/services/blog-backend.service';
import { LoadingStateService } from '../../../core/services/loading-state.service';

type BlogState = {
  error?: string;
};

@Injectable({
  providedIn: 'root',
})
export class BlogStateService {
  #state = signal<BlogState>({ error: undefined });
  state = this.#state.asReadonly();

  private blogService = inject(BlogBackendService);
  private router = inject(Router);
  private loadingState = inject(LoadingStateService);

  async addBlog(blog: CreatedBlog) {
    this.#state.set({ error: undefined });

    try {
      this.loadingState.setLoadingState(true);
      await this.blogService.addBlog(blog);
      this.router.navigate(['/overview']);
    } catch (error) {
      this.loadingState.setLoadingState(false);
      this.#state.update((state) => ({
        ...state,
        error: (error as Error).message,
      }));
    }
  }
}
