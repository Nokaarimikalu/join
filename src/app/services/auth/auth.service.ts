import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseAuth = inject(Auth);

  constructor( private router: Router  ) { }

  register(email: string, username:string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => updateProfile(response.user, {
        displayName: username}),);
        return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(res => 
      {localStorage.setItem('token', 'true')}, err => {
        localStorage.setItem('token', 'false');
      });
    return from(promise);
  }

  logout(){
    this.firebaseAuth.signOut().then(()=>{
      localStorage.removeItem('token')
      this.router.navigate(['/login'])
    }, err => {
      alert(err.errorMessage)
    })
  }

  loggedInUser(): string | null {
  return this.firebaseAuth.currentUser?.email || null;
}
}
