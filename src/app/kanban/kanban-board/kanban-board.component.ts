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

  isDraggingMobile: boolean = false;
  startXMobile: number = 0;
  scrollLeftMobile: number = 0;
  containerMobile?: HTMLElement;
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
    const prevStatus = event.previousContainer.id;
    const newStatus = event.container.id;
    const tasks = this.boardService.dummyTasks;
    const targetTasks = tasks.filter(t => t.status === newStatus);
    if (prevStatus === newStatus) {
      moveItemInArray(targetTasks, event.previousIndex, event.currentIndex);
    } else {
      const movedTask = tasks.find(t => t.id === event.item.data.id); // grouping status and sorting the dragged task in the correct position of the new column task
      if (movedTask) {
        movedTask.status = newStatus;
        const updated = tasks.filter(t => t.status !== newStatus);
        const newTargetTasks = tasks.filter(t => t.status === newStatus && t.id !== movedTask.id);
        newTargetTasks.splice(event.currentIndex, 0, movedTask);
        this.boardService.dummyTasks = [...updated, ...newTargetTasks];
        return;
      }
    }
    const others = tasks.filter(t => t.status !== newStatus); // sort in the same task column 
    this.boardService.dummyTasks = [...others, ...targetTasks];
  }

  startDragMobile(e: MouseEvent | TouchEvent) {
    this.containerMobile = (e.currentTarget as HTMLElement).parentElement!;
    this.isDraggingMobile = true;
    this.startXMobile = ('pageX' in e ? e.pageX : e.touches[0].pageX) - this.containerMobile.offsetLeft;
    this.scrollLeftMobile = this.containerMobile.scrollLeft;
  }

  onDragMobile(e: MouseEvent | TouchEvent) {
    if (!this.isDraggingMobile || !this.containerMobile) return;
    e.preventDefault();
    const x = ('pageX' in e ? e.pageX : e.touches[0].pageX) - this.containerMobile.offsetLeft;
    const walk = (x - this.startXMobile) * 2;
    this.containerMobile.scrollLeft = this.scrollLeftMobile - walk;
  }

  endDragMobile() {
    this.isDraggingMobile = false;
  }
}


