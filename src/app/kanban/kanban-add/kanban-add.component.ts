import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { NavFooterComponent } from '../../shared/nav-footer/nav-footer.component';
import { NavFooterMobileComponent } from '../../shared/nav-footer-mobile/nav-footer-mobile.component';
import { FormsModule } from '@angular/forms';
import { BoardService } from '../../services/board/board.service';
import { TaskItemBoard } from '../../shared/interface/task.interface';

@Component({
  selector: 'app-kanban-add',
  imports: [RouterLink, HeaderComponent, NavFooterComponent, NavFooterMobileComponent, FormsModule],
  templateUrl: './kanban-add.component.html',
  styleUrl: './kanban-add.component.scss'
})
export class KanbanAddComponent {

  taskList: TaskItemBoard = {
    id: '',
    status: '',
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    assignedTo: [],
    subTaskFillTest: []
  };

  constructor(public boardService: BoardService) {}

  addTask() {
    if (this.boardService.selectedTask) {
      this.boardService.addTasks(this.boardService.selectedTask);
      this.boardService.selectedTask = null;
    }
  }

  toggleFullCard() {
    this.boardService.fullCardActive = !this.boardService.fullCardActive;
  }

}