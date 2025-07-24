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

    /**
     * Creates an instance of InfoScreenComponent.
     * @param {OverlayState} overlayState - Service for managing overlay state
     */
    constructor(public overlayState: OverlayState) { }

    /**
     * Toggles the dropdown menu visibility and updates the overlay state.
     * Also toggles the 'hidden' class on the overlay element.
     */
    toggleDropdown(): void {
        const overlayRef = document.querySelector('.overlay');
        overlayRef?.classList.toggle('hidden');
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    /**
     * Closes the dropdown menu by setting isDropdownOpen to false.
     */
    closeDropdown(): void {
        this.isDropdownOpen = false;
    }

    /**
     * Toggles the visibility of the overlay via the overlayState service.
     */
    toggleOverlay() {
        this.overlayState.toggleOverlay();
    }
}
