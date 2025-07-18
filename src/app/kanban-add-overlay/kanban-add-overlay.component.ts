import { Component, NgModule, Input, ViewChild } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { OverlayState } from '../services/contacts/overlayState.service';
import { TaskItemBoard } from '../shared/interface/task.interface';
import { BoardService } from '../services/board/board.service';

@Component({
  selector: 'app-kanban-add-overlay',
  imports: [
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './kanban-add-overlay.component.html',
  styleUrls: ['./kanban-add-overlay.component.scss'],
})
export class KanbanAddOverlayComponent {
  isInputFocused: boolean = false;
  editingSubtaskIndex: number | null = null;
  submitted: boolean = false;
  currentIndex: number = 0;
  editingSubtaskValue: string = '';
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
      assignedTo: [],
      subTaskFillTest: []
    };
  }

  @Input() task!: TaskItemBoard;

  @ViewChild('addTaskForm') addTaskForm!: NgForm;
  @ViewChild('category') addMaterialsForm!: NgModel;

  onSubmit() {
    this.submitted = true;
    this.addTaskForm.form.markAllAsTouched();
    this.addMaterialsForm.control.markAllAsTouched();

    if (this.addTaskForm.form.valid && this.addMaterialsForm.valid) {
      this.boardService.addTasks(this.taskList);
    }
  }

  addTask() {
    if (this.boardService.selectedTask) {
      this.boardService.addTasks(this.boardService.selectedTask);
      this.boardService.selectedTask = null;
    }
  }

    startEditingSubtask(index: number) {
        this.editingSubtaskIndex = index;
        this.editingSubtaskValue = this.task.subTaskFillTest[index].text;
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


  resetForm() {
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
    this.subtaskString = '';
    this.isInputFocused = false;
    this.addTaskForm.reset();
    this.addMaterialsForm.reset();
    this.subtaskString = '';
    this.isInputFocused = false;
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

spliceSubtask() {
  this.taskList.subTaskFillTest.splice(-1, 1);
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