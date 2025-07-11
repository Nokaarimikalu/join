import { Component } from '@angular/core';
import { BoardService } from '../../../services/board/board.service';


@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  constructor(public boardService: BoardService) {

  }

}