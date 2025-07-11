import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskItem } from '../../shared/interface/task.interface';


@Component({
  selector: 'app-kanban-edit',
  imports: [FormsModule],
  templateUrl: './kanban-edit.component.html',
  styleUrl: './kanban-edit.component.scss'
})
export class KanbanEditComponent {

  dummyTasks: TaskItem[] = [
  {
    id: '1',
    title: 'Projektstart',
    description: 'Initiales Meeting und Aufgabenverteilung',
    dueDate: '2025-07-15',
    priority: 'Urgent',
    assignedTo: [{ user: 'Max Mustermann' }],
    subTask: ['Meeting vorbereiten', 'Teilnehmer einladen']
  },
  {
    id: '2',
    title: 'Dokumentation schreiben',
    description: 'Technische Details dokumentieren',
    dueDate: '2025-07-20',
    priority: 'Medium',
    assignedTo: [{ user: 'Anna Müller' }],
    subTask: ['Inhalt gliedern', 'Screenshots einfügen', 'Review einholen']
  },
  ];


  currentIndex = 0; 

  nextTask() {
    
    this.currentIndex = (this.currentIndex + 1) % this.dummyTasks.length;
  }

  prevTask() {
    
    this.currentIndex = (this.currentIndex - 1 + this.dummyTasks.length) % this.dummyTasks.length;
  }

}
