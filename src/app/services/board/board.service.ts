import { Injectable } from '@angular/core';
import { TaskItem } from "../../shared/interface/task.interface";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() {
    console.log(this.dummyTasks);
    
  }

  dummyTasks: TaskItem[] = [
    {
      id: '1',
      category: 'IT',
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
      category: 'I',
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

}
