import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-overlay',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup-overlay.component.html',
  styleUrl: './signup-overlay.component.scss'
})
export class SignupOverlayComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required, Validators.email],
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required] 
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.authService.register(rawForm.email, rawForm.username, rawForm.password)
      .subscribe({
        next: () => {
        this.router.navigateByUrl('/login');
        },
        error: (error) => {
          this.errorMessage = error.code
        },
      });
  }

}
