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
	splittedName?: string[]; // to safe split(' '), firstName & lastName; used in overlay-contacts.components

	editFullName?: string;

	contactList: ContactList = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		color: '',
		initials: '',
	};

	constructor(public overlayState: OverlayState) { }

	toggleOverlay() {
		this.overlayState.toggleOverlay();
	}

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
