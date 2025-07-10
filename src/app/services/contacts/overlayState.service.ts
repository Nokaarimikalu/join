import { inject, Injectable, OnDestroy } from '@angular/core';
import { Firestore, collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { ContactList } from '../../shared/interface/contact-list.interface';

@Injectable({
  providedIn: 'root',
})
export class OverlayState implements OnDestroy {
  //#region attributes
  firestore: Firestore = inject(Firestore);

  unsubscribe: () => void;

  isMobileView: boolean = false;

  AddOrEditState: string = 'addContact';

  fullNameForEdit: string = '';

  selectedUser: ContactList | null = null;

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
      this.sortContacts();
      this.controllResize();
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
      color: obj.color,
      initials: obj.initials
    }
  }

async addContacts(contact: ContactList) {
  contact.firstName = contact.firstName.charAt(0).toUpperCase() + contact.firstName.slice(1); // contact.firstName.slice(1) to add the rest of the name!
  contact.lastName = contact.lastName.charAt(0).toUpperCase() + contact.lastName.slice(1);
  const docRef = await addDoc(collection(this.firestore, 'contacts'), contact);
  this.sortContacts();
  const newIndex = this.contactList.findIndex(u => u.id === docRef.id); 
  this.toggleSelectedProfile(newIndex);
}

  sortContacts() {
    this.contactList.sort((a, b) => { // sort rearranges the array elements based on the rules, in this case. alphabetic with firstname
      return a.firstName.localeCompare(b.firstName); // localCompare is a string method, sorting strings in alphabetic order
    });
  }

  toggleSelectedProfile(activeUser: number) {
    const isSameUser = this.activeProfileIndex === activeUser;

    if (window.innerWidth <= 750) {
      this.activeProfileIndex = activeUser;
      this.selectedUser = this.contactList[activeUser];
      this.mobileViewContacts(activeUser);
    } else {
      this.activeProfileIndex = isSameUser ? null : activeUser;
      this.selectedUser = isSameUser ? null : this.contactList[activeUser];
    }
    this.inputActive = !!this.selectedUser; // first ! makes null to true because its falsy, the second makes it true 
    this.fullNameForEdit = this.selectedUser
      ? `${this.selectedUser.firstName} ${this.selectedUser.lastName}`
      : '';
  }

  mobileViewContacts(activeUser: number) {
    this.activeProfileIndex = activeUser;
    this.selectedUser = this.contactList[activeUser];

    const contactListRef = document.querySelector('.contact-list-component');
    const infoRef = document.querySelector('.app-info-screen-mobile-component');
    contactListRef?.classList.add('hidden');
    infoRef?.classList.remove('hidden');
  }

  controllResize() {
    window.addEventListener('resize', () => { // 'resize' JS implemented eventlistener! 
      const contactListRef = document.querySelector('.contact-list-component');
            const infoRef = document.querySelector('.app-info-screen-mobile-component');

      if (window.innerWidth > 750) {
        contactListRef?.classList.remove('hidden');
                infoRef?.classList.add('hidden');

      }
    });
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
        color: this.selectedUser.color,
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
  }

  editSplitFullName(fullName: string, target: ContactList) {
    const [firstName, ...lastParts] = fullName.split(' ');
    target.firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    target.lastName = lastParts.join(' ').charAt(0).toUpperCase() + lastParts.join(' ').slice(1);
    target.initials = firstName.charAt(0).toUpperCase() + (lastParts[0]?.charAt(0).toUpperCase() || '');
  }

  async deleteContact() {
    if (!this.selectedUser || this.activeProfileIndex === null) return;
    const contactId = this.contactList[this.activeProfileIndex]?.id;
    if (!contactId) return;
    await deleteDoc(doc(this.firestore, 'contacts', contactId))
    this.sortContacts();
        this.toggleSelectedProfile(this.activeProfileIndex);
  }//new deleteFunction

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  getRandomColor() {
    const r: number = Math.floor(Math.random() * 256);
    const g: number = Math.floor(Math.random() * 256);
    const b: number = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  toList() {
    const infoRef = document.querySelector('.app-info-screen-mobile-component');
    infoRef?.classList.toggle('hidden');
    const contactListRef = document.querySelector('.contact-list-component');
    contactListRef?.classList.remove('hidden')
  }
  //#endregion
}
