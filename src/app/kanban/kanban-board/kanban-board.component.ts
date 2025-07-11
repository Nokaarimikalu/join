import { Component } from '@angular/core';
import { CardComponent } from './card/card.component';
import { BoardService } from '../../services/board/board.service';


@Component({
  selector: 'app-kanban-board',
  imports: [CardComponent],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss'
})
export class KanbanBoardComponent {

  constructor(public boardService: BoardService){

  }
}


