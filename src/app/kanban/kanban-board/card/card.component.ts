import { Component, Input } from '@angular/core';
import { BoardService } from '../../../services/board/board.service';
import { TaskItem } from '../../../shared/interface/task.interface';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})



export class CardComponent {
  constructor(public boardService: BoardService) {
  }

@Input() task!: TaskItem


}