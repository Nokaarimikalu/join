import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({ 
      projectId: "kanban-board-fe3c5", 
      appId: "1:719244632942:web:63a5fdaacc220db6f1d77f", 
      storageBucket: "kanban-board-fe3c5.firebasestorage.app", 
      apiKey: "AIzaSyAXn_F7hJs9XUNhQ6izBnpOpY-MZK0yygs", 
      authDomain: "kanban-board-fe3c5.firebaseapp.com", 
      messagingSenderId: "719244632942", 
      measurementId: "G-1N3F9WK1HD" 
    })), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore())
  ]
};
