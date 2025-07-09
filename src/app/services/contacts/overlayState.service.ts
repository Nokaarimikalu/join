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


    isActive = false;

    newContact?: ContactList;


  activeProfileIndex: number | null = null; //safes index if active or null if no profile is active. start value is null no active profile

  isActive: boolean = false; // toggle on off overlay; used in overlay-contacts- and contact-list.components

  inputActive: boolean | null = null; // default info-list page flag

  newContact?: ContactList; // to add new contact; used in overlay-contacts.components

  contactData = this.getContacts();

  contactList: ContactList[] = [];


  //#endregion
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
    this.sortContacts();
    console.log(this.contactData);
  }

  sortContacts() {
    this.contactList.sort((a, b) => { // sort rearranges the array elements based on the rules, in this case. alphabetic with firstname
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
      const newIndex = this.contactList.findIndex(contact => contact.id === this.selectedUser?.id);

if (newIndex !== this.activeProfileIndex) { // if no change in position keep selection (or it will deselecct because of this.tsp() logic)
  this.toggleSelectedProfile(newIndex);
}
    } catch (error) {
      console.error('Error updating document: ', error);

    }


  editSplitFullName(fullName: string, target: ContactList) {
    const [firstName, ...lastParts] = fullName.split(' ');
    target.firstName = firstName;
    target.lastName = lastParts.join(' ');
    target.initials = firstName.charAt(0).toUpperCase() + (lastParts[0]?.charAt(0).toUpperCase() || '');
  }


    addContacts(contact: ContactList) {
        this.contactData.push(contact);
        console.log(contact);
        this.sortContacts();
    }

    sortContacts() {
        this.contactData.sort((a, b) => {
            // sort rearranges the array elements based on the rules, in this case. alphabetic with firstname
            return a.firstName.localeCompare(b.firstName); // localCompare is a string method, sorting strings in alphabetic order
        });
    }

    //#endregion
}
