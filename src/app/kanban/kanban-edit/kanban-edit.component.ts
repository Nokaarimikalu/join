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

    editingSubtaskValue: string = '';
    editingSubtaskIndex: number | null = null;

    //----------------------------------------------------------------------------------
    // dummy Daten solange Firebase nicht eingerichtet wurde
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

    constructor(public overlayState: OverlayState, public boardService: BoardService) { }

    //------------------------------------------------------------------------------------------
    changeToUrgent() {
        this.task.priority = 'Urgent';
    }
    changeToMedium() {
        this.task.priority = 'Medium';
    }
    changeToLow() {
        this.task.priority = 'Low';
    }
    //--------------------------------------------------------------------------------

    debugPriority() {
        console.log(this.task.priority);
        console.log('oben ist referenz');
        console.log(this.task.priority);
    }

    nextTask() {
        this.currentIndex = (this.currentIndex + 1) % this.dummyTasks.length;
    }

    prevTask() {
        this.currentIndex =
            (this.currentIndex - 1 + this.dummyTasks.length) %
            this.dummyTasks.length;
    }

    pushToSubtask() {
        if (this.subtaskString.trim() === '') return;

        if (!this.task.subTaskFillTest) {
            this.task.subTaskFillTest = [];
        }

        const newSubtask = {
            text: this.subtaskString.trim(),
            completed: false
        };

        this.task.subTaskFillTest.push(newSubtask);
        this.subtaskString = '';
        this.isInputFocused = false;
    }

    emptySubtask() {
        this.subtaskString = '';
        this.isInputFocused = false;
    }

    // Update the current task in Firestore with all fields
    async confirmChanges() {
        if (!this.task || !this.task.id) return;
        try {
            // Prepare the updated task object, only include defined fields
            const updatedTask: any = {
                title: this.task.title,
                category: this.task.category,
                description: this.task.description,
                dueDate: this.task.dueDate,
                priority: this.task.priority,
                assignedTo: this.task.assignedTo, 
                status: this.task.status,
                subTaskFillTest: this.task.subTaskFillTest
            };console.log(this.task.subTaskFillTest);
            if (typeof this.task.subTaskFillTest !== 'undefined') {
                updatedTask.subTaskFillTest = this.task.subTask;
            }
            if (typeof this.task.subTaskFillTest !== 'undefined') {
                updatedTask.subTaskFillTest = this.task.subTaskFillTest;
            }
            const { doc, updateDoc } = await import('@angular/fire/firestore');
            const taskDoc = doc(this.boardService.firestore, 'taskItemBoard', this.task.id);
            await updateDoc(taskDoc, updatedTask);
        } catch (error) {
            console.error('Fehler beim Aktualisieren der Aufgabe in Firestore:', error);
        }
    }

    resetChanges() {
        // muss mit json usw weil sonst die Buttons net gehen ??
        this.copyDummyTasks[this.currentIndex] = JSON.parse(
            JSON.stringify(this.dummyTasks[this.currentIndex])
        );
    }

    handleBackdropClick(event: MouseEvent) {
        this.resetChanges();
    }

    subtaskTest(event: MouseEvent) {
        this.isInputFocused = false;
    }

    startEditingSubtask(index: number) {
        this.editingSubtaskIndex = index;
        this.editingSubtaskValue = this.copyDummyTasks[this.currentIndex].subTask[index];
    }

    saveEditingSubtask(index: number) {
        if (this.editingSubtaskValue.trim() !== '') {
            this.copyDummyTasks[this.currentIndex].subTask[index] = this.editingSubtaskValue.trim();
        }
        this.editingSubtaskIndex = null;
    }

    cancelEditingSubtask() {
        this.editingSubtaskIndex = null;
    }

    closeEditingSubtaskOnOverlay(event: MouseEvent) {
        if (this.editingSubtaskIndex !== null) {
            this.cancelEditingSubtask();
        }
    }

    compareWithFn(a: any, b: any): boolean {
  return a?.id === b?.id; 
}
}
