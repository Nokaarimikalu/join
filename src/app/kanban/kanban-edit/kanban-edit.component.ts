import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskItem } from '../../shared/interface/task.interface';
import { OverlayState } from '../../services/contacts/overlayState.service';

@Component({
    selector: 'app-kanban-edit',
    imports: [FormsModule],
    templateUrl: './kanban-edit.component.html',
    styleUrl: './kanban-edit.component.scss',
})
export class KanbanEditComponent {
    
    isInputFocused:boolean = false;

    subtaskString:string = '';

    currentIndex:number = 0;
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


    constructor(public overlayState: OverlayState) {}


//------------------------------------------------------------------------------------------
    changeToUrgent() {
        this.copyDummyTasks[this.currentIndex].priority = 'Urgent';
    }
    changeToMedium() {
        this.copyDummyTasks[this.currentIndex].priority = 'Medium';
    }
    changeToLow() {
        this.copyDummyTasks[this.currentIndex].priority = 'Low';
    }
//--------------------------------------------------------------------------------





    debugPriority() {
        console.log(this.copyDummyTasks[this.currentIndex].priority);
        console.log('oben ist referenz');
        console.log(this.dummyTasks[this.currentIndex].priority);
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
        console.log(this.dummyTasks[this.currentIndex].subTask);
        if (this.subtaskString !== '') {
            this.dummyTasks[this.currentIndex].subTask.push(this.subtaskString);
        } else {
            return;
        }
    }

    emptySubtask() {
        this.subtaskString = '';
    }

    confirmChanges() {
        // muss mit json usw weil sonst die Buttons net gehen ??
        this.dummyTasks[this.currentIndex] =  JSON.parse(JSON.stringify(this.copyDummyTasks[this.currentIndex]));
    }
    resetChanges() {
        // muss mit json usw weil sonst die Buttons net gehen ??
        this.copyDummyTasks[this.currentIndex] = JSON.parse(JSON.stringify(this.dummyTasks[this.currentIndex]));
    }

    handleBackdropClick(event: MouseEvent) {
        this.resetChanges();
    }
}
