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
/*     this.controllResize();
 */  }

/*   controllResize() {
    window.addEventListener('resize', () => { // 'resize' JS implemented eventlistener! 
      const contactListRef = document.querySelector('.contact-list-component');
      
      if (window.innerWidth > 750) {
        contactListRef?.classList.remove('hidden');
      } else if (window.innerWidth > 750) {
                contactListRef?.classList.add('hidden');

      }
    });
  } */

  toggleSelectedProfile(activeUser: number) {
    this.overlayState.toggleSelectedProfile(activeUser)
  }

  toggleOverlay() {
    this.overlayState.toggleOverlay();
  }



}