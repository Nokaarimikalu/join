import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { OverlayState } from '../../services/contacts/overlayState.service';

@Component({
    selector: 'app-info-screen',
    imports: [NgIf],
    templateUrl: './info-screen.component.html',
    styleUrl: './info-screen.component.scss',
})
export class InfoScreenComponent {
    isDropdownOpen: boolean = false;
    


    constructor(public overlayState: OverlayState) {}

    toggleDropdown(): void {
        const overlayRef = document.querySelector('.overlay');
        overlayRef?.classList.toggle('hidden');
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    closeDropdown(): void {
        this.isDropdownOpen = false;
    }

    

    toggleOverlay() {
        this.overlayState.toggleOverlay();
    }
}
