import { inject, Injectable, OnDestroy } from '@angular/core';
import { Firestore, collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { TaskItem, TaskItemBoard } from "../../shared/interface/task.interface";

@Injectable({
  providedIn: 'root'
})
export class BoardService implements OnDestroy{
  firestore: Firestore = inject(Firestore);
  unsubscribe: () => void; 
  fullCardActive: boolean = false;
  selectedTask: TaskItemBoard | null = null;
  editOverlayActive: boolean = false;
  taskData = this.getTasks();
  taskList: TaskItemBoard[] = [];

constructor() {
    this.unsubscribe = onSnapshot(collection(this.firestore, 'taskItemBoard'), (task) => {
      this.taskList = [];
      task.forEach((element) => {
        this.taskList.push(this.setTaskObject(element.id, element.data()));
        
      });
    })
}
  
ngOnDestroy(): void {
  if (this.unsubscribe) {
    this.unsubscribe();
  }
}

setTaskObject(id:string, obj: any):TaskItemBoard{
  return {
    id: id,
    status: obj.status,
    category: obj.category,
    title: obj.title,
    description: obj.description,
    dueDate: obj.dueDate,
    priority: obj.priority,
    assignedTo: obj.assignedTo ,
    subTaskFillTest: obj.subTaskFillTest
  }
}

getTasks(){
  return collection(this.firestore, 'taskItemBoard')
}

async addTasks(task: TaskItemBoard){
  const docRef = await addDoc(collection(this.firestore, 'taskItemBoard'), task);
  console.log(docRef);
  
}

  openFullCard(task: TaskItemBoard) {
    this.fullCardActive = !this.fullCardActive;
    this.selectedTask = task;
  }
/* 
    getSelectedProfile(activeUser: number) {
    const isSameUser = this.activeProfileIndex === activeUser;
  }


 */
/* updateTaskStatus(taskId: string, newStatus: string) {
  const task = this.dummyTasks.find(t => t.id === taskId);
  if (task) {
    task.status = newStatus;
  }
} */

  toggleEditOverlay() {
    this.editOverlayActive = !this.editOverlayActive;
  }
}
