import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { NavFooterMobileComponent } from "../nav-footer-mobile/nav-footer-mobile.component";
import { NavFooterComponent } from "../nav-footer/nav-footer.component";

@Component({
  selector: 'app-legal-notice',
  imports: [HeaderComponent, NavFooterMobileComponent, NavFooterComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {

}
