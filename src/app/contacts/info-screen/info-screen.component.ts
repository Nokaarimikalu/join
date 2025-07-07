import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-info-screen',
    imports: [NgIf],
    templateUrl: './info-screen.component.html',
    styleUrl: './info-screen.component.scss',
})
export class InfoScreenComponent {
    isDropdownOpen = false;

    toggleDropdown(): void {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    closeDropdown(): void {
        this.isDropdownOpen = false;
    }
}
