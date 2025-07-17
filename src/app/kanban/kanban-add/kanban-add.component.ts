import { Component, Input } from '@angular/core';
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
    imports: [
        HeaderComponent,
        NavFooterComponent,
        NavFooterMobileComponent,
        FormsModule,
        MatSelectModule,
    ],
    templateUrl: './kanban-add.component.html',
    styleUrl: './kanban-add.component.scss',
})
export class KanbanAddComponent {
  
  

    isInputFocused: boolean = false;
    currentIndex: number = 0;
    submitted: boolean = false;
    subtaskString: string = '';

    editingSubtaskValue: string = '';
    editingSubtaskIndex: number | null = null;

    taskList: TaskItemBoard = {
        id: '',
        status: 'to do',
        title: '',
        description: '',
        dueDate: '',
        priority: 'Medium',
        assignedTo: [],
        subTaskFillTest: [{ text: '', completed: false }],
    };

    constructor(
        public boardService: BoardService,
        public overlayState: OverlayState
    ) {
        this.taskList = {
            id: '',
            status: this.boardService.taskcolumnStatus || 'to do',
            title: '',
            description: '',
            dueDate: '',
            priority: 'Medium',
            assignedTo: [],
            subTaskFillTest: [{ text: '', completed: false }],
        };
    }

    @Input() task!: TaskItemBoard;

    addTask() {
        if (this.boardService.selectedTask) {
            this.boardService.addTasks(this.boardService.selectedTask);
            this.boardService.selectedTask = null;
        }
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

    pushToSubtask() {
        if (this.subtaskString.trim() === '') return;

        if (!this.task.subTaskFillTest) {
            this.task.subTaskFillTest = [];
        }

        const newSubtask = {
            text: this.subtaskString.trim(),
            completed: false,
        };

        this.task.subTaskFillTest.push(newSubtask);
        this.subtaskString = '';
        this.isInputFocused = false;
    }

    emptySubtask() {
        this.subtaskString = '';
        this.isInputFocused = false;
    }


    resetForm() {
  // Setze taskList auf Standardwerte
  this.taskList = {
    id: '',
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',  
    assignedTo: [],
    category: '',
    subTaskFillTest: []
  };

  // Leere das Subtask-Eingabefeld
  this.subtaskString = '';

  // Setze den Fokus-Status zurück
  this.isInputFocused = false;
}

}
