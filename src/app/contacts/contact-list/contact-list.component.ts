import { Component } from '@angular/core';
import { ContactList } from '../../shared/interface/contact-list.interface';
import { OverlayState } from '../../services/contacts/overlayState.service';

@Component({
    selector: 'app-contact-list',
    imports: [],
    templateUrl: './contact-list.component.html',
    styleUrl: './contact-list.component.scss',
})
export class ContactListComponent {

    prevLetter?: string;

    contactData: ContactList[] = [];

    /**
     * Creates an instance of ContactListComponent.
     * Initializes contact data from overlayState and sorts contacts.
     * @param {OverlayState} overlayState - Service for managing overlay state and contact data
     */
    constructor(public overlayState: OverlayState) {
        this.contactData = this.overlayState.contactList;
        this.overlayState.sortContacts();
    }

    /**
     * Toggles the selected profile in the overlay state.
     * @param {number} activeUser - The ID of the user to be set as active.
     */
    toggleSelectedProfile(activeUser: number) {
        this.overlayState.toggleSelectedProfile(activeUser)
    }

    /**
     * Toggles the visibility of the overlay.
     */
    toggleOverlay() {
        this.overlayState.toggleOverlay();
    }
}