import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ContactList } from '../shared/interface/contact-list.interface';
import { OverlayState } from '../services/contacts/overlayState.service';

@Component({
    selector: 'app-signup-overlay',
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './signup-overlay.component.html',
    styleUrl: './signup-overlay.component.scss'
})
export class SignupOverlayComponent {

    showPassword: boolean = false;

    isFocused: boolean = false;

    isConfirmFocused: boolean = true;

    lockClickCount: number = 0;

    lockIconSrc: string = 'assets/img/login/lock.svg';

    fb = inject(FormBuilder);

    authService = inject(AuthService);

    router = inject(Router);

    splittedName?: string[];

    contactList: ContactList = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        color: '',
        initials: '',
    };

    form = this.fb.nonNullable.group({
        email: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        checkbox: [false, Validators.requiredTrue]
    });
    errorMessage: string | null = null;

    constructor(public overlayState: OverlayState) { }

    onSubmit(): void {
        this.form.markAllAsTouched();

        const rawForm = this.form.getRawValue();
        if (!this.getMailFromContact(rawForm.email)) {
            this.contactList.email = rawForm.email;
            this.contactList.firstName = rawForm.username;
            this.splitFullName();
            this.overlayState.addContacts(this.contactList);
        }
        this.authService.register(rawForm.email, rawForm.username, rawForm.password)
            .subscribe({
                next: () => {
                    this.authService.logout();
                    this.router.navigateByUrl('/login');
                },
                error: (error) => {
                    this.errorMessage = error.code;
                },
            });
    }

    getMailFromContact(mail: string) {
        return this.overlayState.contactList.some(
            contacts => contacts.email === mail
        );
    }

    splitFullName() {
        this.splittedName = this.contactList.firstName.split(' ');
        this.contactList.firstName = this.splittedName[0];
        this.contactList.lastName = this.splittedName[1] || '';
        this.contactList.initials =
            this.contactList.firstName.charAt(0).toUpperCase() +
            this.contactList.lastName.charAt(0).toUpperCase();
        this.contactList.color = this.overlayState.getRandomColor();
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

}
