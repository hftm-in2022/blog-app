import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
} from '@angular/core';
import { BlogDetail } from '../../core/services/blog-backend.service';
import { JsonPipe } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-blog-detail-page',
  standalone: true,
  imports: [JsonPipe, MarkdownComponent],
  templateUrl: './blog-detail-page.component.html',
  styleUrl: './blog-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetailPageComponent {
  @Input() id!: number;

  model = input<BlogDetail>();
}
