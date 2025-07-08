import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

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

    isHiddenInfo = false;
    isHiddenList = false;

    close() {
        this.isHiddenInfo = !this.isHiddenInfo;
        this.isHiddenList = !this.isHiddenList;
    }
    // close() {
    //     const infoToggleRef = document.querySelector('.wrapper1');
    //     const listToggleRef = document.querySelector('#contact-list');
    //     infoToggleRef?.classList.toggle('hidden');
    //     listToggleRef?.classList.toggle('hidden');
    // }
}
