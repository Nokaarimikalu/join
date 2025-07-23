import { Component } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-legal-notice-sign-in',
  imports: [ HeaderComponent,RouterLink],
  templateUrl: './legal-notice-sign-in.component.html',
  styleUrl: './legal-notice-sign-in.component.scss'
})
export class LegalNoticeSignInComponent {

}
