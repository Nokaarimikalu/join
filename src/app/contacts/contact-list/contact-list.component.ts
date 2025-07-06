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

    activeProfileIndex: number | null = null; //safes index if active or null if no profile is active. start value is null no active profile

    constructor(private overlayState: OverlayState) {
        this.sortContacts();
        this.contactData = this.overlayState.getContacts(); // contactData is now being defined from overlayState.services.ts 
    }

    toggleSelectedProfile(activeUser: number) {
        this.activeProfileIndex =
            this.activeProfileIndex === activeUser ? null : activeUser;
    }

    toggleOverlay() {
        this.overlayState.toggleOverlay();
    }

    sortContacts() {
        this.contactData.sort((a, b) => {
            // sort rearranges the array elements based on the rules, in this case. alphabetic with firstname
            return a.firstName.localeCompare(b.firstName); // localCompare is a string method, sorting strings in alphabetic order
        });
    }
}
