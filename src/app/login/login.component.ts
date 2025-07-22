import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, NgModel, NgForm, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  authService = inject(AuthService);

  errorMessage: string | null = null;

  showPassword: boolean = false;


  constructor(private router: Router) { }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.errorMessage = 'Check your email and password. Please try again.';
      return;
    }

    const rawForm = this.form.getRawValue();
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (error) => this.errorMessage = error.code
    });
  }

  guestLogIn() {
    this.authService.login('mustermann@bspmail.com', '123456')
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          this.errorMessage = error.code
        },
      });
  }



}


