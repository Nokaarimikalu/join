import { Component, NgModule, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { OverlayState } from '../services/contacts/overlayState.service';
import { TaskItemBoard } from '../shared/interface/task.interface';
import { BoardService } from '../services/board/board.service';

@Component({
    selector: 'app-kanban-add-overlay',
    imports: [FormsModule, MatSelectModule],
    templateUrl: './kanban-add-overlay.component.html',
    styleUrls: ['./kanban-add-overlay.component.scss'],
})
export class KanbanAddOverlayComponent {
    isInputFocused: boolean = false;

    currentIndex: number = 0;

    subtaskString: string = '';

    taskList: TaskItemBoard;

    constructor(public boardService: BoardService, public overlayState: OverlayState) {
        this.taskList = {
            id: '',
            status: this.boardService.taskcolumnStatus || 'to do',
            title: '',
            description: '',
            dueDate: '',
            priority: 'Medium',
            assignedTo: [{initials:'', firstName:'', lastName:'', color:'', email:'', phone:''}],
            subTaskFillTest: [{text: '', completed: false}] 
        };
    }

      @Input() task!: TaskItemBoard;
    
      addTask() {
        if (this.boardService.selectedTask) {
          this.boardService.addTasks(this.boardService.selectedTask);
          this.boardService.selectedTask = null;
        }
      }
    
      //   clearSubtask() {
      //   this.taskList.subTaskFillTest = [];
      //   this.isInputFocused = false;
      // } 
    
    changeToUrgent() {
        this.taskList.priority = 'Urgent';
      }
    
      changeToMedium() {
        this.taskList.priority = 'Medium';
      }
      
      changeToLow() {
        this.taskList.priority = 'Low';
      }
    
    
    pushToSubtask() {
        if (this.subtaskString.trim() === '') return;

        if (!this.taskList.subTaskFillTest) {
            this.taskList.subTaskFillTest = [];
        }

        const newSubtask = {
            text: this.subtaskString.trim(),
            completed: false
        };

        this.taskList.subTaskFillTest.push(newSubtask);
        this.subtaskString = '';
        this.isInputFocused = false;
    }

    emptySubtask() {
        this.subtaskString = '';
        this.isInputFocused = false;
    }
      toggleFullCard() {
        this.boardService.fullCardActive = !this.boardService.fullCardActive;
      }

      toggleCheckbox(subtaskIndex: number) {
    this.taskList.subTaskFillTest[subtaskIndex].completed = !this.taskList.subTaskFillTest[subtaskIndex].completed;
  }
    
}