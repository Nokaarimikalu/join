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
  }

  filterTaskStatus(status: string ){
    return this.boardService.dummyTasks.filter(task => task.status === status);
    }


    
    searchTasks(){
      const searchInputRef = document.querySelector('.searchTitle')?.ATTRIBUTE_NODE;
      console.log('der log ' + searchInputRef)
      
/* this.dummyTasks.filter(tasks => tasks.title === searchInputRef.value)
 */   }
}


