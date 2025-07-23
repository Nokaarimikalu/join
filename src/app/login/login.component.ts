import { Component, inject, ViewChild } from '@angular/core';
import {
    FormBuilder,
    ReactiveFormsModule,
    Validators,
    NgModel,
    NgForm,
    FormsModule,
    FormGroup,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { OverlayState } from '../services/contacts/overlayState.service';

@Component({
    selector: 'app-login',
    imports: [RouterLink, ReactiveFormsModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
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
    isFocused: boolean = false;
    lockClickCount = 0;

    lockIconSrc = 'assets/img/login/lock.svg'; // Standard-Bild

    constructor(private router: Router, private overlayState: OverlayState) {
    }

    onSubmit(): void {
        this.form.markAllAsTouched();
        const rawForm = this.form.getRawValue();
        if (!this.checkExistingUser(rawForm.email)) {
            this.errorMessage = 'Email does not exist';
            return;
        }
        this.authService.login(rawForm.email, rawForm.password).subscribe({
            next: () => this.router.navigateByUrl('/'),
            error: (error) => (this.errorMessage = error.code),
        });
    }

    guestLogIn() {
        this.authService.login('mustermann@bspmail.com', '123456').subscribe({
            next: () => {
                this.router.navigateByUrl('/');
            },
        });
    }



    checkLockClick(passwordInput: HTMLInputElement): void {
        this.lockClickCount++;
        if (this.lockClickCount === 1 && this.showPassword == false) {
            this.lockIconSrc = 'assets/img/login/visibility_off.svg';
            passwordInput.focus();
        } else if (this.lockClickCount === 2) {
            this.showPassword = true;
            this.lockIconSrc = 'assets/img/login/visibility.svg';
        } else if (this.showPassword === true) {
            this.lockClickCount = 1;
            this.showPassword = false;
            this.lockIconSrc = 'assets/img/login/visibility_off.svg';
        }
    }


    checkPasswordInput(): void {
        const pwValue = this.form.get('password')?.value;

        if (this.lockClickCount < 1 && pwValue) {
            this.lockIconSrc = 'assets/img/login/visibility_off.svg'; // Bild 2 beim erster Eingabe
        }

        if (this.lockClickCount >= 2) {
            this.lockIconSrc = 'assets/img/login/visibility.svg'; // Bild 3 bei weiterer Eingabe
        }
    }

    checkExistingUser(email: string): boolean {
        return this.overlayState.contactList.some(contact =>
            contact.email.toLowerCase() === email.toLowerCase()
        );
    }

}
