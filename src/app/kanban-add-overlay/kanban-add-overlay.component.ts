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

  currentDate: string = new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString().padStart(2, '0') + "-" + new Date().getDate().toString().padStart(2, '0');
  
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

  /** Handles form submission and adds the task if valid. */
  onSubmit() {
    this.submitted = true;
    this.addTaskForm.form.markAllAsTouched();
    this.addMaterialsForm.control.markAllAsTouched();

    if (this.addTaskForm.form.valid && this.addMaterialsForm.valid) {
      this.boardService.addTasks(this.taskList);
    }
  }

  /** Adds the selected task from the service to the board. */
  addTask() {
    if (this.boardService.selectedTask) {
      this.boardService.addTasks(this.boardService.selectedTask);
      this.boardService.selectedTask = null;
    }
  }

  /**
   * Starts editing the subtask at the given index.
   * @param index - Index of the subtask to edit
   */
  startEditingSubtask(index: number) {
    try {
      this.editingSubtaskIndex = index;
      this.editingSubtaskValue = this.task.subTaskFillTest[index].text;
  } catch

  /** Focuses the subtask input field. */
  setFocusOnInput() {
    this.isInputFocused = true;
    const inputField = document.querySelector('.subtaskfield input') as HTMLInputElement;
    inputField?.focus();
  }

  /** Removes focus if the subtask input is empty. */
  handleBlur() {
    if (this.subtaskString.trim() === '') {
      this.isInputFocused = false;
    }
  }

  /** Sets priority to 'Urgent'. */
  changeToUrgent() {
    this.taskList.priority = 'Urgent';
  }

  /** Sets priority to 'Medium'. */
  changeToMedium() {
    this.taskList.priority = 'Medium';
  }

  /** Sets priority to 'Low'. */
  changeToLow() {
    this.taskList.priority = 'Low';
  }

  /** Resets the form and clears all task fields. */
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

  /** Adds a subtask to the task list if input is not empty. */
  pushToSubtask() {
    if (this.subtaskString.trim() === '') { this.isInputFocused = false; return; }
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

  /** Removes the last subtask from the list. */
  spliceSubtask() {
    this.taskList.subTaskFillTest.splice(-1, 1);
  }

  /**
   * Saves the edited subtask text at the current index.
   * @param index - Index of the subtask being edited
   */
  saveEditingSubtask(index: number) {
    if (this.editingSubtaskValue.trim() !== '') {
      this.taskList.subTaskFillTest[this.currentIndex].text = this.editingSubtaskValue.trim();
    }
    this.editingSubtaskIndex = null;
  }

  /** Clears the subtask input field. */
  emptySubtask() {
    this.subtaskString = '';
    this.isInputFocused = false;
  }

  /** Toggles the full card view mode. */
  toggleFullCard() {
    this.boardService.fullCardActive = !this.boardService.fullCardActive;
  }

  /**
   * Toggles the checkbox state (completed) for a subtask.
   * @param subtaskIndex - Index of the subtask
   */
  toggleCheckbox(subtaskIndex: number) {
    this.taskList.subTaskFillTest[subtaskIndex].completed = !this.taskList.subTaskFillTest[subtaskIndex].completed;
  }

  /**
   * Handles Enter (to add subtask) and Escape (to cancel) key presses.
   * @param event - KeyboardEvent
   */
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.pushToSubtask();
    } else if (event.key === 'Escape') {
      this.emptySubtask();
    }
  }
}