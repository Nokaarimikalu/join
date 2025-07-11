import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { NavFooterComponent } from '../shared/nav-footer/nav-footer.component';
import { NavFooterMobileComponent } from '../shared/nav-footer-mobile/nav-footer-mobile.component';
import { RouterLink } from '@angular/router';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';



@Component({
  selector: 'app-kanban',
  imports: [RouterLink, HeaderComponent, NavFooterComponent, NavFooterMobileComponent, KanbanBoardComponent],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent {

}
