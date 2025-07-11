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
      title: 'Erster Task',
      description: 'Das ist ein Test-Task',
      dueDate: new Date('2023-12-31'),
      priority: 'Medium',
      assignedTo: { name: 'Max Mustermann' },
      subTask: [
        { task: 'Unteraufgabe 1' },
        { task: 'Unteraufgabe 2' }
      ]
    },
    {
      id: '2',
      title: 'Zweiter Task',
      description: 'Noch ein Beispiel',
      dueDate: new Date('2024-01-15'),
      priority: 'High',
      assignedTo: { name: 'Anna Müller' },
      subTask: [
        { task: 'Research' },
        { task: 'Dokumentation' }
      ]
    }
  ];


  currentIndex = 0; 

  nextTask() {
    
    this.currentIndex = (this.currentIndex + 1) % this.dummyTasks.length;
  }

  prevTask() {
    
    this.currentIndex = (this.currentIndex - 1 + this.dummyTasks.length) % this.dummyTasks.length;
  }

}
