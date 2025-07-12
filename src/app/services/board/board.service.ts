import { Injectable } from '@angular/core';
import { TaskItem } from "../../shared/interface/task.interface";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() {

}

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
    status: 'to do'
  },
  {
    id: '2',
    title: 'Dokumentation schreiben',
    category: 'Entwicklung',
    description: 'Technische Details dokumentieren',
    dueDate: '2025-07-20',
    priority: 'Medium',
    assignedTo: [{ user: 'Anna Müller' }],
    subTask: ['Inhalt gliedern', 'Screenshots einfügen', 'Review einholen'],
    status: 'to do'
  },
  {
    id: '3',
    title: 'Design-Review',
    category: 'Design',
    description: 'UI/UX mit Kunden abstimmen',
    dueDate: '2025-07-18',
    priority: 'Urgent',
    assignedTo: [{ user: 'Lisa Schmidt' }],
    subTask: ['Mockups aktualisieren', 'Feedback einarbeiten'],
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
    status: 'in progress'
  },
  {
    id: '7',
    title: 'CI/CD Pipeline einrichten',
    category: 'DevOps',
    description: 'Automatisierte Deployment-Prozesse implementieren',
    dueDate: '2025-07-19',
    priority: 'low',
    assignedTo: [{ user: 'Sophie Keller' }],
    subTask: ['GitHub Actions konfigurieren', 'Deployment testen'],
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
    status: 'in progress'
  },
  {
    id: '10',
    title: 'Designsystem überarbeiten',
    category: 'Design',
    description: 'Farben und Komponenten vereinheitlichen',
    dueDate: '2025-07-21',
    priority: 'Low',
    assignedTo: [{ user: 'Jan König' }],
    subTask: ['Farbschema prüfen', 'Komponenten anpassen'],
    status: 'in progress'
  }
];
/* 
  filterTaskStatus(status: string) {
    return this.dummyTasks.filter(task => task.status === status); // returns filtered status used for filtering right kanban column 
  } */

}
