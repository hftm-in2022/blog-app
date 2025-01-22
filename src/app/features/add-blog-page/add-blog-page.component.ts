import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { CreatedBlog } from '../../core/services/blog-backend.service';
import { BlogStateService } from './state/blog-state.service';

@Component({
  selector: 'app-add-blog-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-blog-page.component.html',
  styleUrl: './add-blog-page.component.scss',
})
export class AddBlogPageComponent {
  blogStateService = inject(BlogStateService);
  submitButtonDisabled = signal<boolean>(false);

  form!: FormGroup<{
    title: FormControl<string | null>;
    content: FormControl<string | null>;
  }>;

  constructor() {
    this.form = new FormGroup({
      title: new FormControl<string | null>(
        'an existing title',
        [
          Validators.required,
          Validators.pattern('^[A-Z]+(.)*'),
          this.customValidator,
        ],
        this.customAsyncValidator,
      ),
      content: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitButtonDisabled.set(true);
      this.blogStateService.addBlog(this.form.value as CreatedBlog);
    }
  }

  customValidator(control: FormControl): ValidationErrors | null {
    if (control.value === 'Test') {
      return { custom: true };
    }
    return null;
  }

  customAsyncValidator(
    control: AbstractControl,
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (control.value === 'Test Async') {
          resolve({ customAsync: true });
        }
        resolve(null);
      });
    });
  }
}
