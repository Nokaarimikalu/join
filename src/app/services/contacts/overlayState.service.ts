import { Injectable } from '@angular/core';
import { ContactList } from '../../shared/interface/contact-list.interface';

@Injectable({
  providedIn: 'root',
})
export class OverlayState {
  //#region attributes
  AddOrEditState: string = 'addContact';

  selectedUser?: ContactList; // to safe selectedUser; used in info-screen.components to display selected user

  activeProfileIndex: number | null = null; //safes index if active or null if no profile is active. start value is null no active profile

  isActive: boolean = false; // toggle on off overlay; used in overlay-contacts- and contact-list.components

  newContact?: ContactList; // to add new contact; used in overlay-contacts.components

  contactData: ContactList[] = [
    //dummy data
    {
      firstName: 'Anna',
      lastName: 'Schmidt',
      email: 'anna.schmidt@example.com',
      phone: '+49 170 1234567',
      initials: 'AS',
    },
    {
      firstName: 'Max',
      lastName: 'Müller',
      email: 'max.mueller@example.com',
      phone: '+49 152 2345678',
      initials: 'MM',
    },
    {
      firstName: 'Lena',
      lastName: 'Fischer',
      email: 'lena.fischer@example.com',
      phone: '+49 160 3456789',
      initials: 'LF',
    },
    {
      firstName: 'Paul',
      lastName: 'Weber',
      email: 'paul.weber@example.com',
      phone: '+49 151 4567890',
      initials: 'PW',
    },
    {
      firstName: 'Julia',
      lastName: 'Klein',
      email: 'julia.klein@example.com',
      phone: '+49 176 5678901',
      initials: 'JK',
    },
    {
      firstName: 'Tim',
      lastName: 'Hoffmann',
      email: 'tim.hoffmann@example.com',
      phone: '+49 175 6789012',
      initials: 'TH',
    },
    {
      firstName: 'Laura',
      lastName: 'Wolf',
      email: 'laura.wolf@example.com',
      phone: '+49 174 7890123',
      initials: 'LW',
    },
    {
      firstName: 'Jan',
      lastName: 'Neumann',
      email: 'jan.neumann@example.com',
      phone: '+49 172 8901234',
      initials: 'JN',
    },
    {
      firstName: 'Mia',
      lastName: 'Schneider',
      email: 'mia.schneider@example.com',
      phone: '+49 173 9012345',
      initials: 'MS',
    },
    {
      firstName: 'Tom',
      lastName: 'Zimmer',
      email: 'tom.zimmer@example.com',
      phone: '+49 171 0123456',
      initials: 'TZ',
    },
  ];
  //#endregion
  //#region constructor
  constructor() { }
  //#endregion
  //#region methods
  toggleOverlay() {
    this.isActive = !this.isActive;
  }

  getContacts() {
    return this.contactData;
  }

  addContacts(contact: ContactList) {
    this.contactData.push(contact);
    this.sortContacts();
  }

  sortContacts() {
    this.contactData.sort((a, b) => {
      // sort rearranges the array elements based on the rules, in this case. alphabetic with firstname
      return a.firstName.localeCompare(b.firstName); // localCompare is a string method, sorting strings in alphabetic order
    });
  }

  toggleSelectedProfile(activeUser: number) {
    this.activeProfileIndex = this.activeProfileIndex === activeUser ? null : activeUser;
    this.selectedUser = this.contactData[activeUser]; // get the object from array correct
  }

  //#endregion
}
