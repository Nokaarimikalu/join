import { Component, Input } from '@angular/core';
import { CardComponent } from './card/card.component';
import { BoardService } from '../../services/board/board.service';
import { TaskItem, TaskItemBoard } from '../../shared/interface/task.interface';
import { FullCardComponent } from './full-card/full-card.component';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-kanban-board',
  imports: [CardComponent, FullCardComponent, DragDropModule],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss'
})
export class KanbanBoardComponent {

  searchValue: string = "";

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

  tasksSearchAndStatus(status: string, searchValue: string) {
    const filteredStatus = this.filterTaskStatus(status);
    return filteredStatus.filter(task => task.title?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())); // ?.value because no start value 
  }

  drop(event: CdkDragDrop<TaskItemBoard[]>) {
    console.log('Source ID:', event.previousContainer.id);
    console.log('Target ID:', event.container.id);
    if (event.previousContainer === event.container) {
      
      const filteredTasks = this.boardService.dummyTasks.filter(t => t.status === event.container.id);
      moveItemInArray(filteredTasks, event.previousIndex, event.currentIndex);

      const otherTasks = this.boardService.dummyTasks.filter(
        t => t.status !== event.container.id
      );
      this.boardService.dummyTasks = [...otherTasks, ...filteredTasks];
    } else {
      const movedTask = { ...event.item.data };
      movedTask.status = event.container.id;

      this.boardService.dummyTasks = this.boardService.dummyTasks.filter(
        t => t.id !== movedTask.id
      );

      this.boardService.dummyTasks = [...this.boardService.dummyTasks, movedTask];
    }
  }
}


