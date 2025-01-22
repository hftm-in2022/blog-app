import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, map, Observable } from 'rxjs';
import { z } from 'zod';
import { environment } from '../../../environments/environment';

const CommentSchema = z.object({
  id: z.number(),
  content: z.string(),
  author: z.string(),
  updatedAt: z.string(),
  createdAt: z.string(),
});

const BlogDetailSchema = z.object({
  id: z.number(),
  updatedAt: z.string(),
  createdAt: z.string(),
  title: z.string(),
  content: z.string(),
  comments: z.array(CommentSchema),
  author: z.string(),
  likes: z.number(),
  likedByMe: z.boolean(),
  createdByMe: z.boolean(),
  headerImageUrl: z.string().optional(),
});

const BlogSchema = z.object({
  id: z.number(),
  title: z.string(),
  contentPreview: z.string(),
  author: z.string(),
  likes: z.number(),
  comments: z.number(),
  likedByMe: z.boolean(),
  createdByMe: z.boolean(),
  headerImageUrl: z.string().optional(),
});

const BlogArraySchema = z.array(BlogSchema);

const EntriesSchema = z.object({
  data: BlogArraySchema,
  pageIndex: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  maxPageSize: z.number(),
});

const CreatedBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type BlogDetail = z.infer<typeof BlogDetailSchema>;

export type CreatedBlog = z.infer<typeof CreatedBlogSchema>;

export type Blog = z.infer<typeof BlogSchema>;

export type Entries = z.infer<typeof EntriesSchema>;

@Injectable({
  providedIn: 'root',
})
export class BlogBackendService {
  httpClient = inject(HttpClient);

  getBlogPosts(): Observable<Entries> {
    return this.httpClient
      .get<Entries>(`${environment.serviceUrl}/entries`)
      .pipe(map((entries) => EntriesSchema.parse(entries)));
  }

  addBlog(blog: CreatedBlog) {
    CreatedBlogSchema.parse(blog);
    return lastValueFrom(
      this.httpClient.post(`${environment.serviceUrl}/entries`, blog),
    );
  }

  getBlogDetail(id: number) {
    return this.httpClient
      .get<Blog>(`${environment.serviceUrl}/entries/${id}`)
      .pipe(map((blog) => BlogDetailSchema.parse(blog)));
  }
}
