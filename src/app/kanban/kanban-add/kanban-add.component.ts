import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { NavFooterComponent } from '../../shared/nav-footer/nav-footer.component';
import { NavFooterMobileComponent } from '../../shared/nav-footer-mobile/nav-footer-mobile.component';
import { FormsModule } from '@angular/forms';
import { BoardService } from '../../services/board/board.service';
import { TaskItemBoard } from '../../shared/interface/task.interface';
import { MatSelectModule } from '@angular/material/select';
import { OverlayState } from '../../services/contacts/overlayState.service';


@Component({
  selector: 'app-kanban-add',
  imports: [RouterLink, HeaderComponent, NavFooterComponent, NavFooterMobileComponent, FormsModule, MatSelectModule],
  templateUrl: './kanban-add.component.html',
  styleUrl: './kanban-add.component.scss'
})
export class KanbanAddComponent {
  isInputFocused: boolean = false;
  currentIndex: number = 0;

  taskList: TaskItemBoard = {
    id: '',
    status: 'to do',
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    assignedTo: [{initials:'', firstName:'', lastName:'', color:'', email:'', phone:''}],
    subTaskFillTest: [{text: '', completed: false}]
  };

  constructor(public boardService: BoardService, public overlayState: OverlayState) {}

  addTask() {
    if (this.boardService.selectedTask) {
      this.boardService.addTasks(this.boardService.selectedTask);
      this.boardService.selectedTask = null;
    }
  }

    clearSubtask() {
    this.taskList.subTaskFillTest = [];
    this.isInputFocused = false;
  } 

changeToUrgent() {
    this.taskList.priority = 'Urgent';
  }

  changeToMedium() {
    this.taskList.priority = 'Medium';
  }
  
  changeToLow() {
    this.taskList.priority = 'Low';
  }



  toggleFullCard() {
    this.boardService.fullCardActive = !this.boardService.fullCardActive;
  }

}