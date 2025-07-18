import { Component } from '@angular/core';
import { NavFooterComponent } from '../shared/nav-footer/nav-footer.component';
import { NavFooterMobileComponent } from '../shared/nav-footer-mobile/nav-footer-mobile.component';
import { HeaderComponent } from '../shared/header/header.component';
import { RouterLink } from '@angular/router';
import { SummaryContentComponent } from './summary-content/summary-content.component';



@Component({
  selector: 'app-summary',
  imports: [NavFooterComponent, NavFooterMobileComponent, HeaderComponent, RouterLink, SummaryContentComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

}
