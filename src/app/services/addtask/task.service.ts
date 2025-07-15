// task.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { TaskItem } from '../../shared/interface/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private firestore: AngularFirestore) {}

  createTask(task: TaskItem): Promise<any> {
    // Füge ein timestamp-Feld hinzu für die Sortierung
    const taskWithTimestamp = {
      ...task,
      createdAt: new Date().toISOString()
    };
    
    return this.firestore.collection('tasks').add(taskWithTimestamp);
  }

  getTasks(): Observable<TaskItem[]> {
    return this.firestore.collection<TaskItem>('tasks').valueChanges({ idField: 'id' });
  }

  // Weitere Firebase-spezifische Methoden können hier hinzugefügt werden
}