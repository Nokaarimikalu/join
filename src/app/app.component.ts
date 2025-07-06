import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OverlayContactsComponent } from './contacts/overlay-contacts/overlay-contacts.component';
import { ContactListComponent } from "./contacts/contact-list/contact-list.component";
import { NavFooterComponent } from './shared/nav-footer/nav-footer.component';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavFooterComponent, HeaderComponent, OverlayContactsComponent, ContactListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Join';
}
