import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { OverlayState } from '../../services/contacts/overlayState.service';

@Component({
    selector: 'app-info-screen-mobile',
    imports: [NgIf],
    templateUrl: './info-screen-mobile.component.html',
    styleUrl: './info-screen-mobile.component.scss',
})
export class InfoScreenMobileComponent {
    isDropdownOpen: boolean = false;
    
    /**
     * Creates an instance of InfoScreenMobileComponent.
     * @param {OverlayState} overlayState - Service for managing overlay state
     */
    constructor(public overlayState: OverlayState) {}

    /**
     * Toggles the dropdown menu visibility and overlay state
     */
    toggleDropdown(): void {
        const overlayRef = document.querySelector('.overlay');
        overlayRef?.classList.toggle('hidden');
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    /**
     * Closes the dropdown menu
     */
    closeDropdown(): void {
        this.isDropdownOpen = false;
    }

    /**
     * Toggles the overlay visibility
     */
    toggleOverlay() {
        this.overlayState.toggleOverlay();
    }
}