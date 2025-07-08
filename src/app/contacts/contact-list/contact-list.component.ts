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

/*   activeProfileIndex: number | null = null; //safes index if active or null if no profile is active. start value is null no active profile
 */
  constructor(public overlayState: OverlayState) {
    this.contactData = this.overlayState.contactList; // contactData is now being defined from overlayState.services.ts
    this.overlayState.sortContacts();
    console.log(this.contactData);
    
  }

  toggleSelectedProfile(activeUser: number) {
    this.overlayState.toggleSelectedProfile(activeUser)
  }

  toggleOverlay() {
    this.overlayState.toggleOverlay();
  }

}
