import { Component, Input } from '@angular/core';
import { CardComponent } from './card/card.component';
import { BoardService } from '../../services/board/board.service';
import { TaskItem } from '../../shared/interface/task.interface';


@Component({
  selector: 'app-kanban-board',
  imports: [CardComponent],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss'
})
export class KanbanBoardComponent {

  constructor(public boardService: BoardService){
console.log(this.filterTaskStatus('to do'));

  }
  filterTaskStatus(status: string ){
    return this.boardService.dummyTasks.filter(task => task.status === status);
    }

}


