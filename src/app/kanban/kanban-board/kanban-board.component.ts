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

  searchValue: string ="";

  constructor(public boardService: BoardService) {
  }

  filterTaskStatus(status: string) {
    return this.boardService.dummyTasks.filter(task => task.status === status); // returns filtered status used for filtering right kanban column 
  }

  searchTasks() {
    const searchInputRef = document.querySelector('.searchTitle') as HTMLInputElement; // without HTMLInputElement ts .value is not working (because of querySelector!)
    this.searchValue = searchInputRef?.value
    return this.boardService.dummyTasks.filter(task => task.title?.toLocaleLowerCase() === searchInputRef?.value); // ?.value because no start value 
    }

  tasksSearchAndStatus(status: string, searchValue: string){
    const filteredStatus = this.filterTaskStatus(status);
    return filteredStatus.filter(task => task.title?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())  ); // ?.value because no start value 
  }

  
}


