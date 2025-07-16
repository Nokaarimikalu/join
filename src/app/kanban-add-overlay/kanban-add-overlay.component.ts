import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { OverlayState } from '../services/contacts/overlayState.service';
import { TaskItem } from '../shared/interface/task.interface';

@Component({
    selector: 'app-kanban-add-overlay',
    imports: [FormsModule, MatSelectModule],
    templateUrl: './kanban-add-overlay.component.html',
    styleUrls: ['./kanban-add-overlay.component.scss'],
})
export class KanbanAddOverlayComponent {
    isInputFocused: boolean = false;

    isListClicked: string = 'list';

    subtaskString: string = '';

    currentIndex: number = 0;

    selectedContacts: TaskItem[] = [
        {
            id: '',
            title: '',
            category: '',
            description: '',
            dueDate: '',
            priority: 'Medium',
            assignedTo: [{ user: '' }],
            subTask: [],
        },
    ];
    // Overlay State Service
    constructor(public overlayState: OverlayState) {}

    // Priority Functions
    changeToUrgent() {
        this.selectedContacts[this.currentIndex].priority = 'Urgent';
    }

    changeToMedium() {
        this.selectedContacts[this.currentIndex].priority = 'Medium';
    }

    changeToLow() {
        this.selectedContacts[this.currentIndex].priority = 'Low';
    }

    // Subtask Management
    pushToSubtask() {
        if (this.subtaskString.trim() === '') {
            return; // Leere Eingabe ignorieren
        }

        const currentSubtasks =
            this.selectedContacts[this.currentIndex].subTask;
        const isAlreadyExists = currentSubtasks.some(
            (task) =>
                task.toLowerCase() === this.subtaskString.toLowerCase().trim()
        );

        //trim() entfernt die " "

        if (!isAlreadyExists) {
            currentSubtasks.push(this.subtaskString.trim());
            this.subtaskString = '';
            this.isInputFocused = false;
        } else {
            // Optional: Feedback an den Benutzer (z. B. Toast, Alert, Console)
            console.warn('Dieser Eintrag existiert bereits!');
            // this.showError = true; // Falls du eine Fehlermeldung anzeigen willst
        }
    }

    emptySubtask() {
        this.subtaskString = '';
        this.isInputFocused = false;
    }

    confirmChanges() {
        this.selectedContacts[this.currentIndex] = JSON.parse(
            JSON.stringify(this.selectedContacts[this.currentIndex])
        );
    }
    resetChanges() {
        this.selectedContacts[this.currentIndex] = JSON.parse(
            JSON.stringify(this.selectedContacts[this.currentIndex])
        );
    }

    handleBackdropClick(event: MouseEvent) {
        this.resetChanges();
    }

    subtaskTest(event: MouseEvent) {
        this.isInputFocused = false;
    }

    clearSubtask() {
        this.selectedContacts[this.currentIndex].subTask = [];
        this.isInputFocused = false;
    }

    editSubtask(index: number) {
        // Logik zum Bearbeiten des Subtasks
        this.isListClicked = 'activateTextarea';
    }

    deleteSubtask(index: number) {
        // Logik zum Löschen des Subtasks
        this.selectedContacts[this.currentIndex].subTask.splice(index, 1);
    }
}
