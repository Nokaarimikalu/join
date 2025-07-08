import { inject, Injectable, OnDestroy } from '@angular/core';
import { Firestore, collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { ContactList } from '../../shared/interface/contact-list.interface';

@Injectable({
  providedIn: 'root',
})
export class OverlayState {
  //#region attributes
  firestore: Firestore = inject(Firestore);

  unsubscribe: () => void;

  AddOrEditState: string = 'addContact';

  fullNameForEdit: string = '';

  selectedUser: ContactList | null = null;

  activeProfileIndex: number | null = null; //safes index if active or null if no profile is active. start value is null no active profile

  isActive: boolean = false; // toggle on off overlay; used in overlay-contacts- and contact-list.components

  inputActive: boolean | null = null; // default info-list page flag

  newContact?: ContactList; // to add new contact; used in overlay-contacts.components

  contactData = this.getContacts();

  contactList: ContactList[] = [];

  /*   contactData: ContactList[] = [
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
   */  //#endregion
  //#region constructor
  constructor() {
    this.unsubscribe = onSnapshot(collection(this.firestore, 'contacts'), (contact) => {
      this.contactList = [];
      contact.forEach((element) => {
        this.contactList.push(this.setContactsObject(element.id, element.data()));
      });
      console.log(this.contactList);
      this.sortContacts();

    })
  }
  //#endregion
  //#region methods
  toggleOverlay() {
    this.isActive = !this.isActive;
  }

  getContacts() {
    return collection(this.firestore, 'contacts');
  }

  setContactsObject(id: string, obj: any): ContactList {
    return {
      id: id,
      firstName: obj.firstName,
      lastName: obj.lastName,
      email: obj.email,
      phone: obj.phone,
      initials: obj.initials
    }
  }

  async addContacts(contact: ContactList) {
    await addDoc(collection(this.firestore, 'contacts'), contact);
    // await this.firestore.collection('contacts').add(contact);
    // this.contactData.push(contact);
    this.sortContacts();
    console.log(this.contactData);
  }



  sortContacts() {
    this.contactList.sort((a, b) => {
      // sort rearranges the array elements based on the rules, in this case. alphabetic with firstname
      return a.firstName.localeCompare(b.firstName); // localCompare is a string method, sorting strings in alphabetic order
    });
  }

  toggleSelectedProfile(activeUser: number) {
    const isSameUser = this.activeProfileIndex === activeUser;
    this.activeProfileIndex = isSameUser ? null : activeUser;
    this.selectedUser = isSameUser ? null : this.contactList[activeUser];
    this.inputActive = isSameUser ? false : true;
    this.fullNameForEdit = this.selectedUser ? `${this.contactList[activeUser].firstName} ${this.contactList[activeUser].lastName}` : '';
  }

  /*   getFullNameForEdit(): string {
      return this.selectedUser ? `${this.selectedUser.firstName} ${this.selectedUser.lastName}` : '';
    } */

async updateContact() {
  if (!this.selectedUser || this.activeProfileIndex === null) return;

  const contactId = this.contactList[this.activeProfileIndex]?.id;
  if (!contactId) return;

  this.editSplitFullName(this.fullNameForEdit, this.selectedUser);
  this.contactList[this.activeProfileIndex] = { ...this.selectedUser };

  try {
    const contactRef = doc(this.firestore, 'contacts', contactId);
    await updateDoc(contactRef, {
      firstName: this.selectedUser.firstName,
      lastName: this.selectedUser.lastName,
      email: this.selectedUser.email,
      phone: this.selectedUser.phone,
      initials: this.selectedUser.initials
    });
    this.sortContacts();
  } catch (error) {
    console.error('Error updating document: ', error);
  }
}


  editSplitFullName(fullName: string, target: ContactList) {
    const [firstName, ...lastParts] = fullName.split(' ');
    target.firstName = firstName;
    target.lastName = lastParts.join(' ');
    target.initials = firstName.charAt(0).toUpperCase() + (lastParts[0]?.charAt(0).toUpperCase() || '');
  }

  //#endregion
}
