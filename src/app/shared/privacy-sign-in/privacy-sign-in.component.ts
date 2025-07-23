import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy-sign-in',
  imports: [HeaderComponent, RouterLink],
  templateUrl: './privacy-sign-in.component.html',
  styleUrl: './privacy-sign-in.component.scss'
})
export class PrivacySignInComponent {

}
