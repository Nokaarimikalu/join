import { Component, Input } from '@angular/core';
import { BoardService } from '../../../services/board/board.service';
import { TaskItem } from '../../../shared/interface/task.interface';
import { CdkDrag } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-card',
  imports: [CdkDrag],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent {
  constructor(public boardService: BoardService) {
  }

@Input() task!: TaskItem


}