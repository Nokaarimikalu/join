import { Component } from '@angular/core';
import { NavFooterComponent } from "../nav-footer/nav-footer.component";
import { HeaderComponent } from "../header/header.component";
import { NavFooterMobileComponent } from "../nav-footer-mobile/nav-footer-mobile.component";

@Component({
  selector: 'app-help-me',
  imports: [NavFooterComponent, HeaderComponent, NavFooterMobileComponent],
  templateUrl: './help-me.component.html',
  styleUrl: './help-me.component.scss'
})
export class HelpMeComponent {

}
