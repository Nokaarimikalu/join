import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { NavFooterComponent } from '../../shared/nav-footer/nav-footer.component';
import { NavFooterMobileComponent } from '../../shared/nav-footer-mobile/nav-footer-mobile.component';
import { OverlayState } from '../../services/contacts/overlayState.service';
import { FormsModule } from '@angular/forms';
import { TaskItem } from '../../shared/interface/task.interface';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-kanban-add',
  imports: [
    FormsModule,
    HeaderComponent,
    NavFooterComponent,
    NavFooterMobileComponent,
    MatSelectModule
  ],
  templateUrl: './kanban-add.component.html',
  styleUrl: './kanban-add.component.scss',
})
export class KanbanAddComponent {
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

  // *Dummy Daten
  // dummyTasks: TaskItem[] = [
  //   {
  //     id: '1',
  //     title: 'Projektstart',
  //     category: 'Management',
  //     description: 'Initiales Meeting und Aufgabenverteilung',
  //     dueDate: '2025-07-15',
  //     priority: 'Urgent',
  //     assignedTo: [{ user: 'Max Mustermann' }],
  //     subTask: ['Meeting vorbereiten', 'Teilnehmer einladen'],
  //   },
  //   {
  //     id: '2',
  //     title: 'Dokumentation schreiben',
  //     category: 'Entwicklung',
  //     description: 'Technische Details dokumentieren',
  //     dueDate: '2025-07-20',
  //     priority: 'Medium',
  //     assignedTo: [{ user: 'Anna Müller' }],
  //     subTask: ['Inhalt gliedern', 'Screenshots einfügen', 'Review einholen'],
  //   },
  //   {
  //     id: '3',
  //     title: 'Bugfixing Sprint 3',
  //     category: 'Entwicklung',
  //     description: 'Offene Bugs aus Sprint 3 beheben',
  //     dueDate: '2025-07-25',
  //     priority: 'Urgent',
  //     assignedTo: [{ user: 'Lukas Schmidt' }],
  //     subTask: ['Fehler identifizieren', 'Fix schreiben', 'Testen'],
  //   },
  //   {
  //     id: '4',
  //     title: 'Kundendemo vorbereiten',
  //     category: 'Marketing',
  //     description: 'Demo für Stakeholder vorbereiten',
  //     dueDate: '2025-07-18',
  //     priority: 'Low',
  //     assignedTo: [{ user: 'Clara Becker' }],
  //     subTask: ['Ablauf planen', 'Unterlagen erstellen', 'Technik prüfen'],
  //   },
  //   {
  //     id: '5',
  //     title: 'UX-Review',
  //     category: 'Design',
  //     description: 'Feedbackrunde zur Nutzerfreundlichkeit',
  //     dueDate: '2025-07-22',
  //     priority: 'Medium',
  //     assignedTo: [{ user: 'Tom Meier' }],
  //     subTask: ['Feedback sammeln', 'UX-Bericht erstellen'],
  //   },
  // ];

  //* Copy der Dummy Daten
  // copyDummyTasks: TaskItem[] = JSON.parse(JSON.stringify(this.dummyTasks));

  constructor(public overlayState: OverlayState) {}

  changeToUrgent() {
    this.selectedContacts[this.currentIndex].priority = 'Urgent';
  }
  changeToMedium() {
    this.selectedContacts[this.currentIndex].priority = 'Medium';
  }
  changeToLow() {
    this.selectedContacts[this.currentIndex].priority = 'Low';
  }

  debug() {
    console.log();
    
    
    
  }


  pushToSubtask() {
    if (this.subtaskString.trim() === '') {
      return; // Leere Eingabe ignorieren
    }

    const currentSubtasks = this.selectedContacts[this.currentIndex].subTask;
    const isAlreadyExists = currentSubtasks.some(
      (task) => task.toLowerCase() === this.subtaskString.toLowerCase().trim()
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
    // muss mit json usw weil sonst die Buttons net gehen ??
    this.selectedContacts[this.currentIndex] = JSON.parse(
      JSON.stringify(this.selectedContacts[this.currentIndex])
    );
  }
  resetChanges() {
    // muss mit json usw weil sonst die Buttons net gehen ??
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
