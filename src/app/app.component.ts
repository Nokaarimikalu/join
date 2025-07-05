import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OverlayContactsComponent } from './contacts/overlay-contacts/overlay-contacts.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OverlayContactsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Join';
}
