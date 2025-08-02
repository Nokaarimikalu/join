import { Component, input, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { NavFooterComponent } from '../../shared/nav-footer/nav-footer.component';
import { NavFooterMobileComponent } from '../../shared/nav-footer-mobile/nav-footer-mobile.component';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { BoardService } from '../../services/board/board.service';
import { TaskItemBoard } from '../../shared/interface/task.interface';
import { MatSelectModule } from '@angular/material/select';
import { OverlayState } from '../../services/contacts/overlayState.service';
import { empty } from 'rxjs';

@Component({
    selector: 'app-kanban-add',
    imports: [
        HeaderComponent,
        NavFooterComponent,
        NavFooterMobileComponent,
        FormsModule,
        MatSelectModule
    ],
    templateUrl: './kanban-add.component.html',
    styleUrl: './kanban-add.component.scss',
})
export class KanbanAddComponent {

    @ViewChild('addTaskForm') addTaskForm!: NgForm;
    @ViewChild('category') addMaterialsForm!: NgModel;
    @ViewChild('subtaskInput') subtaskInput!: HTMLInputElement;

    isInputFocused: boolean = false;

    currentIndex: number = 0;

    submitted: boolean = false;

    subtaskString: string = '';

    currentDate: string = new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString().padStart(2, '0') + "-" + new Date().getDate().toString().padStart(2, '0');

    editingSubtaskValue: string = '';

    editingSubtaskIndex: number | null = null;

    @Input() task!: TaskItemBoard;

    taskList: TaskItemBoard = {
        id: '',
        status: 'to do',
        title: '',
        description: '',
        dueDate: '',
        priority: 'Medium',
        assignedTo: [],
        subTaskFillTest: [],
    };

    /**
       * Creates an instance of KanbanAddComponent.
       * Initializes taskList with default values from boardService
       * @param {BoardService} boardService - Service for board operations
       * @param {OverlayState} overlayState - Service for overlay state management
       */
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
            subTaskFillTest: [],
        };
    }

    /**
     * Handles form submission and validates inputs
     */
    onSubmit() {
        this.submitted = true;
        this.addTaskForm.form.markAllAsTouched();
        this.addMaterialsForm.control.markAllAsTouched();
        if (this.addTaskForm.form.valid && this.addMaterialsForm.valid) {
            this.boardService.addTasks(this.taskList);
        }
    }

    /**
     * Adds the currently selected task to the board
     */
    addTask() {
        if (this.boardService.selectedTask) {
            this.boardService.addTasks(this.boardService.selectedTask);
            this.boardService.selectedTask = null;
        }
    }

    /**
     * Sets task priority to 'Urgent'
     */
    changeToUrgent() {
        this.taskList.priority = 'Urgent';
    }

    /**
     * Sets task priority to 'Medium'
     */
    changeToMedium() {
        this.taskList.priority = 'Medium';
    }

    /**
     * Sets task priority to 'Low'
     */
    changeToLow() {
        this.taskList.priority = 'Low';
    }

    /**
     * Toggles the full card view
     */
    toggleFullCard() {
        this.boardService.fullCardActive = !this.boardService.fullCardActive;
    }

    /**
     * Adds a new subtask to the task
     */
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

    /**
     * Clears the current subtask input
     */
    emptySubtask() {
        this.subtaskString = '';
        this.isInputFocused = false;
    }

    /**
     * Sets focus on the subtask input field
     */
    setFocusOnInput() {
        this.isInputFocused = true;
        const inputField = document.querySelector('.subtaskfield input') as HTMLInputElement;
        inputField?.focus();
    }

    /**
     * Handles blur event for subtask input
     */
    handleBlur() {
        if (this.subtaskString.trim() === '') {
            this.isInputFocused = false;
        }
    }

    /**
     * Starts editing a subtask
     * @param {number} index - Index of the subtask to edit
     */
    startEditingSubtask(index: number) {
        try {
            this.editingSubtaskIndex = index;
            this.editingSubtaskValue = this.task.subTaskFillTest[index].text;
        } catch (error) {
            // Error handling remains silent as per original code
        }
    }

    /**
     * Saves the edited subtask
     * @param {number} index - Index of the subtask being edited
     */
    saveEditingSubtask(index: number) {
        if (this.subtaskString.trim() === '') {
            this.spliceSubtask(index);
            this.cancelEditingSubtask();
            return;
        }
        if (this.editingSubtaskValue.trim() !== '') {
        this.taskList.subTaskFillTest[index].text =
        this.editingSubtaskValue.trim();
        }
        this.editingSubtaskIndex = null;
    }


    cancelEditingSubtask() {
        this.editingSubtaskIndex = null;
    }
    /**
     * Resets the form to its initial state
     */
    resetForm() {
        this.taskList = {
            id: '',
            title: '',
            description: '',
            dueDate: '',
            priority: 'Medium',
            assignedTo: [],
            category: '',
            subTaskFillTest: []};
        this.subtaskString = '';
        this.isInputFocused = false;
        this.addTaskForm.reset();
        this.addMaterialsForm.reset();
    }

    /**
     * Removes the last subtask from the list
     */
    spliceSubtask(index:number) {
        this.taskList.subTaskFillTest.splice(index, 1);
        this.cancelEditingSubtask();
    }

    /**
     * Handles keyboard events for subtask input
     * @param {KeyboardEvent} event - The keyboard event
     */
    onKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.pushToSubtask();
        } else if (event.key === 'Escape') {
            this.emptySubtask();
        }
    }
}