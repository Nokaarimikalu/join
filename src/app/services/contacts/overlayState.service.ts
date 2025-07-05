import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverlayState {
  isActive = false;

  constructor() { }

  toggleOverlay(){
    this.isActive = !this.isActive;
  }
}
