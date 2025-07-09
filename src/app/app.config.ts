import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "join-42542", appId: "1:1033228656604:web:4a7b2e3a4ed43af39d3919", storageBucket: "join-42542.firebasestorage.app", apiKey: "AIzaSyCmDh3SPsvoZ1yBlvz3H-ZrSIqRWozxGbE", authDomain: "join-42542.firebaseapp.com", messagingSenderId: "1033228656604" })), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({ projectId: "join-42542", appId: "1:1033228656604:web:4a7b2e3a4ed43af39d3919", storageBucket: "join-42542.firebasestorage.app", apiKey: "AIzaSyCmDh3SPsvoZ1yBlvz3H-ZrSIqRWozxGbE", authDomain: "join-42542.firebaseapp.com", messagingSenderId: "1033228656604" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
