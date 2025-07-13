import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavFooterComponent } from '../nav-footer/nav-footer.component';
import { NavFooterMobileComponent } from '../nav-footer-mobile/nav-footer-mobile.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy',
  imports: [HeaderComponent, NavFooterComponent, NavFooterMobileComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {

}
