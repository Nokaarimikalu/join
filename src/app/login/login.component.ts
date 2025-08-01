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

    lockClickCount: number = 0;

    lockIconSrc: string = 'assets/img/login/lock.svg';


    /**
     * Constructor that injects router and overlayState service.
     * @param router Angular router for navigation
     * @param overlayState Service providing access to stored contacts
     */
    constructor(private router: Router, private overlayState: OverlayState) {}
    /**
     * Handles login form submission. Validates credentials and attempts login.
     */
    onSubmit(): void {
        this.form.markAllAsTouched();
        const rawForm = this.form.getRawValue();
/*         if (!this.checkExistingUser(rawForm.email)) {
            this.errorMessage = 'Email does not exist';
            return;
        } */
        this.authService.login(rawForm.email, rawForm.password).subscribe({
            next: () => this.router.navigateByUrl('/'),
            error: () => this.errorMessage = 'Check your email and password.',
        });
            localStorage.removeItem('loginDraft');
    }

        ngOnInit() {
        this.form.valueChanges.subscribe(values => { localStorage.setItem('loginDraft', JSON.stringify(values)) });
        const savedData = localStorage.getItem('loginDraft');
        if (savedData !== null) {
            this.form.patchValue(JSON.parse(savedData));
        }
    }

    /**
     * Logs in with predefined guest credentials.
     */
    guestLogIn(): void {
        this.authService.login('guestlogin@join.com', 'guest123').subscribe({
            next: () => {
                this.router.navigateByUrl('/');
            },
        });
    }

    /**
     * Handles the lock icon click to toggle password visibility.
     * Changes the icon and focuses the input accordingly.
     * @param passwordInput Reference to the password input field
     */
    checkLockClick(passwordInput: HTMLInputElement): void {
        this.lockClickCount++;
        if (this.lockClickCount === 1 && this.showPassword == false) {
            this.showPassword = true;
            this.lockIconSrc = 'assets/img/login/visibility.svg';
        }else if (this.lockClickCount === 2) {
            this.lockClickCount = 0;
            this.showPassword = false;
            this.lockIconSrc = 'assets/img/login/visibility_off.svg';
        }
    }

    /**
     * Updates the password visibility icon based on user input and click count.
     */
    checkPasswordInput(): void {
        const pwValue = this.form.get('password')?.value;
        if (this.lockClickCount < 1 && pwValue) {
            this.lockIconSrc = 'assets/img/login/visibility_off.svg';
        }
        if (this.lockClickCount >= 2) {
            this.lockIconSrc = 'assets/img/login/visibility.svg';
        }
    }

    /**
     * Checks whether the given email exists in the current contact list.
     * @param email The email address to check
     * @returns True if the email is found, false otherwise
     */
/*     checkExistingUser(email: string): boolean {
        return this.overlayState.contactList.some(contact =>
            contact.email.toLowerCase() === email.toLowerCase()
        );
    } */
}