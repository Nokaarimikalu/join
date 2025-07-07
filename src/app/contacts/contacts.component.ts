import { Component } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { OverlayContactsComponent } from './overlay-contacts/overlay-contacts.component';
import { NavFooterComponent } from '../shared/nav-footer/nav-footer.component';
import { HeaderComponent } from '../shared/header/header.component';
import { InfoScreenComponent } from './info-screen/info-screen.component';
import { NavFooterMobileComponent } from "../shared/nav-footer-mobile/nav-footer-mobile.component";


@Component({
  selector: 'app-contacts',
  imports: [ContactListComponent, HeaderComponent, InfoScreenComponent, NavFooterComponent, ContactListComponent, OverlayContactsComponent, NavFooterMobileComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

}
