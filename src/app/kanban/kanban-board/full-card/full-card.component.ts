import { Component, Input } from '@angular/core';
import { BoardService } from '../../../services/board/board.service';
import { TaskItem } from '../../../shared/interface/task.interface';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-full-card',
  imports: [FormsModule],
  templateUrl: './full-card.component.html',
  styleUrl: './full-card.component.scss'
})
export class FullCardComponent {
  constructor(public boardService: BoardService) {
  }
  @Input() task!: TaskItem

}
