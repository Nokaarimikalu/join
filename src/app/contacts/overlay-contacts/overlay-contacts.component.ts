import { Component } from '@angular/core';
import { OverlayState } from '../../services/contacts/overlayState.service';
import { FormsModule } from '@angular/forms';
import { ContactList } from '../../shared/interface/contact-list.interface';

@Component({
    selector: 'app-overlay-contacts',
    imports: [FormsModule],
    templateUrl: './overlay-contacts.component.html',
    styleUrl: './overlay-contacts.component.scss',
})
export class OverlayContactsComponent {
    fullName: string = '';

    newContact: ContactList = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        initials: '',
    };

    constructor(public overlayState: OverlayState) { }

    toggleOverlay() {
        this.overlayState.toggleOverlay();
    }

    resetNewContactInput() {
        this.newContact = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            initials: '',
        };
    }
}
