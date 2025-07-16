import { inject, Injectable, OnDestroy } from '@angular/core';
import { Firestore, collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { TaskItem, TaskItemBoard } from "../../shared/interface/task.interface";

@Injectable({
  providedIn: 'root'
})
export class BoardService implements OnDestroy {

  firestore: Firestore = inject(Firestore);

  unsubscribe: () => void;

  addCardActive:boolean = false;

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

  setTaskObject(id: string, obj: any): TaskItemBoard {
    return {
      id: id,
      status: obj.status,
      category: obj.category,
      title: obj.title,
      description: obj.description,
      dueDate: obj.dueDate,
      priority: obj.priority,
      assignedTo: obj.assignedTo,
      subTaskFillTest: obj.subTaskFillTest
    }
  }

  getTasks() {
    return collection(this.firestore, 'taskItemBoard')
  }

  async addTasks(task: TaskItemBoard) {
    const docRef = await addDoc(collection(this.firestore, 'taskItemBoard'), task);
    return docRef.id
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

    toggleAddOverlay() {
    this.editOverlayActive = !this.editOverlayActive;
  }


  async updateTaskFullcard(task: TaskItemBoard) {
    if (!task.id) return; //if no task.id is generated from firebase return otherwise kanban board will crash and no input in card and fullcard will beshown
    const taskRef = doc(this.firestore, 'taskItemBoard', task.id); //create  reference  from specific id 
    await updateDoc(taskRef, {subTaskFillTest: task.subTaskFillTest}); //update only the specific subtask array in documentd (ref with task.id)
  }

    async deleteTask(task: TaskItemBoard) {
    if (!task.id) return; //if no task.id is generated from firebase return otherwise kanban board will crash and no input in card and fullcard will beshown
    await deleteDoc(doc(this.firestore, 'taskItemBoard', task.id))  }
}
