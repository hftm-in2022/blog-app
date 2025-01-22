import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog-detail-page',
  standalone: true,
  imports: [],
  templateUrl: './blog-detail-page.component.html',
  styleUrl: './blog-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetailPageComponent {
  @Input() id!: number;
}
