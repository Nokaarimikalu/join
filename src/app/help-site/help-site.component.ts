import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { NavFooterComponent } from '../shared/nav-footer/nav-footer.component';
import { NavFooterMobileComponent } from '../shared/nav-footer-mobile/nav-footer-mobile.component';

@Component({
  selector: 'app-help-site',
  imports: [HeaderComponent, NavFooterComponent ],
  templateUrl: './help-site.component.html',
  styleUrl: './help-site.component.scss'
})
export class HelpSiteComponent {

}
