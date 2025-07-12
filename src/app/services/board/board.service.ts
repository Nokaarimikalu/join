import { Injectable } from '@angular/core';
import { TaskItem } from "../../shared/interface/task.interface";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() {
/*     console.log(this.filterTaskStatus('to do'));
 */  }

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
    status: ''
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
    status: 'in progress'
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
  }
];

/*   filterTaskStatus(status: string ){
    return this.dummyTasks.filter(task => task.status === status);
    } */
}
