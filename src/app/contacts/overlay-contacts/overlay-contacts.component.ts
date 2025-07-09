import { Component } from '@angular/core';
import { OverlayState } from '../../services/contacts/overlayState.service';
import { FormsModule } from '@angular/forms';
import { NewContact } from '../../shared/interface/newContact.interface';
import { ContactList } from '../../shared/interface/contact-list.interface';

@Component({
    selector: 'app-overlay-contacts',
    imports: [FormsModule],
    templateUrl: './overlay-contacts.component.html',
    styleUrl: './overlay-contacts.component.scss',
})
export class OverlayContactsComponent {
    splittedName?: string[]; // to safe split(' '), firstName & lastName; used in overlay-contacts.components

    editFullName?: string;

    newContact: NewContact = {
        fullName: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        initials: '',
    };

    constructor(public overlayState: OverlayState) {}

    toggleOverlay() {
        this.overlayState.toggleOverlay();
    }

    resetNewContactInput() {
        this.newContact = {
            fullName: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            initials: '',
        };
    }

    splitFullName() {
        this.splittedName = this.newContact.fullName.split(' ');
        this.newContact.firstName = this.splittedName[0];
        this.newContact.lastName = this.splittedName[1];
        this.newContact.initials =
            this.newContact.firstName.charAt(0).toUpperCase() +
            this.newContact.lastName.charAt(0).toUpperCase();
    }
}
