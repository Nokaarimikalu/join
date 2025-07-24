import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static helpOpen:boolean = false;

  firebaseAuth = inject(Auth);

  /**
   * Injects Router for navigation
   * @param router Angular Router
   */
  constructor(private router: Router) {}

  /**
   * Registers a new user with email, username, and password
   * @param email User's email
   * @param username User's display name
   * @param password User's password
   * @returns Observable that completes when registration and profile update are done
   */
  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response =>
        updateProfile(response.user, {
          displayName: username
        }),
      );
    return from(promise);
  }

  /**
   * Logs in a user with email and password
   * @param email User's email
   * @param password User's password
   * @returns Observable that completes when login is successful or fails
   */
  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(res => {
      localStorage.setItem('token', 'true')
    }, err => {
      localStorage.setItem('token', 'false');
    });
    return from(promise);
  }

  /**
   * Logs out the current user, clears token, and navigates to login page
   */
  logout(): void {
    this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.errorMessage);
    });
  }

  /**
   * Returns the email of the currently logged-in user
   * @returns Email string or null if no user is logged in
   */
  loggedInUser(): string | null {
    return this.firebaseAuth.currentUser?.email || null;
  }
}