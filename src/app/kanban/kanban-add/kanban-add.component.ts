import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { NavFooterComponent } from '../../shared/nav-footer/nav-footer.component';
import { NavFooterMobileComponent } from '../../shared/nav-footer-mobile/nav-footer-mobile.component';

@Component({
  selector: 'app-kanban-add',
  imports: [RouterLink, HeaderComponent, NavFooterComponent, NavFooterMobileComponent],
  templateUrl: './kanban-add.component.html',
  styleUrl: './kanban-add.component.scss'
})
export class KanbanAddComponent {

}
