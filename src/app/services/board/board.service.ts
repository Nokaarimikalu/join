import { Injectable, signal } from '@angular/core';
import { TaskItem, TaskItemBoard } from "../../shared/interface/task.interface";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  
  fullCardActive: boolean = false;
selectedTask: TaskItem | null = null;

  constructor() {

}


  dummyTasks: TaskItemBoard[] = [
  {
    id: '1',
    title: 'Projektstart',
    category: 'Management',
    description: 'Initiales Meeting und Aufgabenverteilung',
    dueDate: '2025-07-15',
    priority: 'Urgent',
    assignedTo: [{ user: 'Max Mustermann' }],
    subTask: ['Meeting vorbereiten', 'Teilnehmer einladen'],
    subTaskFillTest: [
      { text: 'Meeting vorbereiten', completed: true },
      { text: 'Teilnehmer einladen', completed: false }
    ],
    status: 'to do'
  },
  {
    id: '2',
    title: 'Dokumentation schreiben',
    category: 'Entwicklung',
    description: 'Technische Details dokumentieren',
    dueDate: '2025-07-20',
    priority: 'Medium',
    assignedTo: [{ user: 'Anna Müller' }, { user: 'Max Mustermann' }],
    subTask: ['Inhalt gliedern', 'Screenshots einfügen', 'Review einholen'],
    subTaskFillTest: [
      { text: 'Inhalt gliedern', completed: true },
      { text: 'Screenshots einfügen', completed: false },
      { text: 'Review einholen', completed: false }
    ],
    status: 'to do'
  },
  {
    id: '3',
    title: 'Design-Review',
    category: 'Design',
    description: 'UI/UX mit Kunden abstimmen',
    dueDate: '2025-07-18',
    priority: 'Urgent',
    assignedTo: [{ user: 'Lisa Schmidt' }, { user: 'Tom Weber' }, { user: 'Lukas Meier' }],
    subTask: ['Mockups aktualisieren', 'Feedback einarbeiten'],
    subTaskFillTest: [
      { text: 'Mockups aktualisieren', completed: true },
      { text: 'Feedback einarbeiten', completed: true }
    ],
    status: 'await feedback'
  },
  {
    id: '4',
    title: 'API-Tests',
    category: 'Entwicklung',
    description: 'Endpunkte testen und dokumentieren',
    dueDate: '2025-07-10',
    priority: 'Medium',
    assignedTo: [{ user: 'Tom Weber' }],
    subTask: ['Testfälle schreiben', 'Postman-Sammlung erstellen'],
    subTaskFillTest: [
      { text: 'Testfälle schreiben', completed: true },
      { text: 'Postman-Sammlung erstellen', completed: true }
    ],
    status: 'done'
  },
  {
    id: '5',
    title: 'Kickoff-Präsentation',
    category: 'Management',
    description: 'Präsentation für Stakeholder vorbereiten',
    dueDate: '2025-07-12',
    priority: 'Urgent',
    assignedTo: [{ user: 'Julia Fischer' }],
    subTask: ['Folien designen', 'Daten aktualisieren'],
    subTaskFillTest: [
      { text: 'Folien designen', completed: true },
      { text: 'Daten aktualisieren', completed: false }
    ],
    status: 'done'
  },
  {
    id: '6',
    title: 'Code-Review Backend',
    category: 'Entwicklung',
    description: 'Überprüfung des neuen Backends',
    dueDate: '2025-07-14',
    priority: 'Urgent',
    assignedTo: [{ user: 'Lukas Meier' }],
    subTask: ['Pull Request prüfen', 'Kommentare schreiben'],
    subTaskFillTest: [
      { text: 'Pull Request prüfen', completed: true },
      { text: 'Kommentare schreiben', completed: false }
    ],
    status: 'in progress'
  },
  {
    id: '7',
    title: 'CI/CD Pipeline einrichten',
    category: 'DevOps',
    description: 'Automatisierte Deployment-Prozesse implementieren',
    dueDate: '2025-07-19',
    priority: 'low',
    assignedTo: [{ user: 'Sophie Keller' }, { user: 'David Braun' }],
    subTask: ['GitHub Actions konfigurieren', 'Deployment testen'],
    subTaskFillTest: [
      { text: 'GitHub Actions konfigurieren', completed: false },
      { text: 'Deployment testen', completed: false }
    ],
    status: 'in progress'
  },
  {
    id: '8',
    title: 'Benutzerhandbuch erstellen',
    category: 'Dokumentation',
    description: 'Anleitung für Endnutzer schreiben',
    dueDate: '2025-07-22',
    priority: 'Medium',
    assignedTo: [{ user: 'David Braun' }],
    subTask: ['Kapitelstruktur erstellen', 'Beispiele einfügen'],
    subTaskFillTest: [
      { text: 'Kapitelstruktur erstellen', completed: true },
      { text: 'Beispiele einfügen', completed: false }
    ],
    status: 'in progress'
  },
  {
    id: '9',
    title: 'Fehleranalyse Frontend',
    category: 'Entwicklung',
    description: 'Bug im Dashboard beheben',
    dueDate: '2025-07-13',
    priority: 'Urgent',
    assignedTo: [{ user: 'Nina Hoffmann' }],
    subTask: ['Fehler reproduzieren', 'Fix implementieren'],
    subTaskFillTest: [
      { text: 'Fehler reproduzieren', completed: true },
      { text: 'Fix implementieren', completed: false }
    ],
    status: 'in progress'
  },
  {
    id: '10',
    title: 'Designsystem überarbeiten',
    category: 'Design',
    description: 'Farben und Komponenten vereinheitlichen',
    dueDate: '2025-07-21',
    priority: 'Low',
    assignedTo: [{ user: 'Jan König' }, { user: 'Nina Hoffmann' }],
    subTask: ['Farbschema prüfen', 'Komponenten anpassen'],
    subTaskFillTest: [
      { text: 'Farbschema prüfen', completed: false },
      { text: 'Komponenten anpassen', completed: false }
    ],
    status: 'in progress'
  }
];

  openFullCard(task: TaskItem) {
    this.fullCardActive = !this.fullCardActive;
    this.selectedTask = task;
  }
/* 
    getSelectedProfile(activeUser: number) {
    const isSameUser = this.activeProfileIndex === activeUser;
  }


 */
}
