import { Component } from '@angular/core';
import { OverlayState } from '../../services/contacts/overlayState.service';
import { FormsModule } from '@angular/forms';
import { ContactList } from "../../shared/interface/contact-list.interface";

@Component({
    selector: 'app-overlay-contacts',
    imports: [FormsModule],
    templateUrl: './overlay-contacts.component.html',
    styleUrl: './overlay-contacts.component.scss',
})
export class OverlayContactsComponent {
    splittedName?: string[];

    editFullName?: string;

    contactList: ContactList = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        color: '',
        initials: '',
    };

    /**
     * Creates an instance of OverlayContactsComponent.
     * @param {OverlayState} overlayState - Service for managing overlay and contacts state
     */
    constructor(public overlayState: OverlayState) { }

    /**
     * Toggles the overlay visibility
     */
    toggleOverlay() {
        this.overlayState.toggleOverlay();
    }

    /**
     * Resets the contact form inputs to empty values
     */
    resetNewContactInput() {
        this.contactList = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            color: '',
            initials: '',
        };
    }

    /**
     * Checks if contact email exists and adds contact if not
     * @param {ContactList} contacts - The contact data to be added
     */
    checkAndAdd(contacts: ContactList) {
        if (!this.getMailFromContact(this.contactList.email)) {
            this.overlayState.addContacts(contacts);
        }
    }

    /**
     * Checks if email already exists in contact list
     * @param {string} mail - The email to check
     * @returns {boolean} True if email exists, false otherwise
     */
    getMailFromContact(mail: string) {
        return this.overlayState.contactList.some(
            contacts => contacts.email === mail
        );
    }

    /**
     * Splits full name into first and last name, generates initials and random color
     */
    splitFullName() {
        this.splittedName = this.contactList.firstName.split(' ');
        this.contactList.firstName = this.splittedName[0];
        this.contactList.lastName = this.splittedName[1];
        this.contactList.initials =
            this.contactList.firstName.charAt(0).toUpperCase() +
            this.contactList.lastName.charAt(0).toUpperCase();
        this.contactList.color = this.overlayState.getRandomColor();
    }
}