import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskItem, TaskItemBoard } from '../../shared/interface/task.interface';
import { OverlayState } from '../../services/contacts/overlayState.service';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { BoardService } from '../../services/board/board.service';
import { ContactList } from '../../shared/interface/contact-list.interface';

@Component({
    selector: 'app-kanban-edit',
    imports: [FormsModule, MatSelectModule],
    templateUrl: './kanban-edit.component.html',
    styleUrl: './kanban-edit.component.scss',
})
export class KanbanEditComponent {
    @Input() task!: TaskItemBoard;

    selectedUser: ContactList[] = [];

    isInputFocused: boolean = false;

    isListClicked: string = 'list';

    subtaskString: string = '';

    currentIndex: number = 0;

    currentDate: string =
        new Date().getFullYear().toString() +
        '-' +
        (new Date().getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        new Date().getDate().toString().padStart(2, '0');

    editingSubtaskValue: string = '';
    
    editingSubtaskIndex: number | null = null;


    dummyTasks: TaskItem[] = [
        {
            id: '1',
            title: 'Projektstart',
            category: 'Management',
            description: 'Initiales Meeting und Aufgabenverteilung',
            dueDate: '2025-07-15',
            priority: 'Urgent',
            assignedTo: [{ user: 'Max Mustermann' }],
            subTask: ['Meeting vorbereiten', 'Teilnehmer einladen'],
        },
        {
            id: '2',
            title: 'Dokumentation schreiben',
            category: 'Entwicklung',
            description: 'Technische Details dokumentieren',
            dueDate: '2025-07-20',
            priority: 'Medium',
            assignedTo: [{ user: 'Anna Müller' }],
            subTask: [
                'Inhalt gliedern',
                'Screenshots einfügen',
                'Review einholen',
            ],
        },
        {
            id: '3',
            title: 'Bugfixing Sprint 3',
            category: 'Entwicklung',
            description: 'Offene Bugs aus Sprint 3 beheben',
            dueDate: '2025-07-25',
            priority: 'Urgent',
            assignedTo: [{ user: 'Lukas Schmidt' }],
            subTask: ['Fehler identifizieren', 'Fix schreiben', 'Testen'],
        },
        {
            id: '4',
            title: 'Kundendemo vorbereiten',
            category: 'Marketing',
            description: 'Demo für Stakeholder vorbereiten',
            dueDate: '2025-07-18',
            priority: 'Low',
            assignedTo: [{ user: 'Clara Becker' }],
            subTask: [
                'Ablauf planen',
                'Unterlagen erstellen',
                'Technik prüfen',
            ],
        },
        {
            id: '5',
            title: 'UX-Review',
            category: 'Design',
            description: 'Feedbackrunde zur Nutzerfreundlichkeit',
            dueDate: '2025-07-22',
            priority: 'Medium',
            assignedTo: [{ user: 'Tom Meier' }],
            subTask: ['Feedback sammeln', 'UX-Bericht erstellen'],
        },
    ];
    // copy dummyDaten
    copyDummyTasks: TaskItem[] = JSON.parse(JSON.stringify(this.dummyTasks));
    //---------------------------------------------------------------------------------------------

  constructor(
        public overlayState: OverlayState,
        public boardService: BoardService
    ) {}

    /** Sets task priority to 'Urgent'. */
    changeToUrgent() {
        this.task.priority = 'Urgent';
    }

    /** Sets task priority to 'Medium'. */
    changeToMedium() {
        this.task.priority = 'Medium';
    }

    /** Sets task priority to 'Low'. */
    changeToLow() {
        this.task.priority = 'Low';
    }

    /** Switches to the next task in the dummy task list. */
    nextTask() {
        this.currentIndex = (this.currentIndex + 1) % this.dummyTasks.length;
    }

    /** Switches to the previous task in the dummy task list. */
    prevTask() {
        this.currentIndex =
            (this.currentIndex - 1 + this.dummyTasks.length) % this.dummyTasks.length;
    }

    /** Adds a new subtask to the current task if input is not empty. */
    pushToSubtask() {
        if (this.subtaskString.trim() === '') {
            this.isInputFocused = false;
            return;
        } if (!this.task.subTaskFillTest) {
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

    /** Clears the subtask input field. */
    emptySubtask() {
        this.subtaskString = '';
        this.isInputFocused = false;
    }

    /** Updates the task in Firestore with all current values. */
    async confirmChanges() {
        if (!this.task || !this.task.id) return;
        try {
            const updatedTask: any = {
                title: this.task.title,
                category: this.task.category,
                description: this.task.description,
                dueDate: this.task.dueDate,
                priority: this.task.priority,
                assignedTo: this.task.assignedTo,
                status: this.task.status,
                subTaskFillTest: this.task.subTaskFillTest,
            };
            if (typeof this.task.subTaskFillTest !== 'undefined') {
                updatedTask.subTaskFillTest = this.task.subTask;
            }
            if (typeof this.task.subTaskFillTest !== 'undefined') {
                updatedTask.subTaskFillTest = this.task.subTaskFillTest;
            }
            const { doc, updateDoc } = await import('@angular/fire/firestore');
            const taskDoc = doc(
                this.boardService.firestore,
                'taskItemBoard',
                this.task.id
            );
            await updateDoc(taskDoc, updatedTask);
        } catch (error) {
            console.error('Error updating task in Firestore:', error);
        }
    }

    /** Resets the current task to its original dummy state. */
    resetChanges() {
        this.copyDummyTasks[this.currentIndex] = JSON.parse(
            JSON.stringify(this.dummyTasks[this.currentIndex])
        );
    }

    /**
     * Handles a click on the backdrop and resets changes.
     * @param event - MouseEvent from the backdrop
     */
    handleBackdropClick(event: MouseEvent) {
        this.resetChanges();
    }

    /**
     * Removes focus when clicking outside of the subtask input.
     * @param event - MouseEvent
     */
    subtaskTest(event: MouseEvent) {
        this.isInputFocused = false;
    }

    /**
     * Starts editing a subtask at a given index.
     * @param index - Index of the subtask
     */
    startEditingSubtask(index: number) {
        this.editingSubtaskIndex = index;
        this.editingSubtaskValue =
        this.copyDummyTasks[this.currentIndex].subTask[index];
    }

    /**
     * Saves the edited subtask at the given index.
     * @param index - Index of the subtask
     */
    saveEditingSubtask(index: number) {
        if (this.editingSubtaskValue.trim() !== '') {
        this.copyDummyTasks[this.currentIndex].subTask[index] =
        this.editingSubtaskValue.trim();
        }
        this.editingSubtaskIndex = null;
    }

    /** Cancels subtask editing. */
    cancelEditingSubtask() {
        this.editingSubtaskIndex = null;
    }

    /**
     * Cancels subtask editing if clicking outside.
     * @param event - MouseEvent
     */
    closeEditingSubtaskOnOverlay(event: MouseEvent) {
        if (this.editingSubtaskIndex !== null) {
            this.cancelEditingSubtask();
        }
    }

    /**
     * Checks if the user is assigned to the current task.
     * @param user - The user to check
     * @returns True if assigned, false otherwise
     */
    isUserAssigned(user: ContactList): boolean {
        return (
            this.task.assignedTo?.some(
                (assignedUser) => assignedUser.email === user.email
            ) || false
        );
    }

    /** Sets focus on the subtask input field. */
    setFocusOnInput() {
        this.isInputFocused = true;
        const inputField = document.querySelector('.subtaskfield input') as HTMLInputElement;
        inputField?.focus();
    }

    /** Handles blur if subtask input is empty. */
    handleBlur() {
        if (this.subtaskString.trim() === '') {
            this.isInputFocused = false;
        }
    }

    /**
     * Handles keypress events on the subtask input field.
     * @param event - KeyboardEvent (Enter or Escape)
     */
    onKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.pushToSubtask();
        } else if (event.key === 'Escape') {
            this.emptySubtask();
        }
    }
}