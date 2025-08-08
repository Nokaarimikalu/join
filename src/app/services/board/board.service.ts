import { inject, Injectable, OnDestroy } from '@angular/core';
import { Firestore, collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { TaskItemBoard } from "../../shared/interface/task.interface";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BoardService implements OnDestroy {

  firestore: Firestore = inject(Firestore);

  unsubscribe: () => void;

  boardRouterlink?: string; 

  taskcolumnStatus: string = '';

  addCardActive: boolean = false;

  fullCardActive: boolean = false;

  selectedTask: TaskItemBoard | null = null;

  editOverlayActive: boolean = false;

  taskData = this.getTasks();

  taskList: TaskItemBoard[] = [];

  /**
   * Creates an instance of BoardService
   * @param {Router} router - Angular router service
   */
  constructor(private router: Router) {
    this.unsubscribe = onSnapshot(collection(this.firestore, 'taskItemBoard'), (task) => {
      this.taskList = [];
      task.forEach((element) => {
        this.taskList.push(this.setTaskObject(element.id, element.data()));
      });
    })
  }

  /**
   * Cleans up Firestore snapshot listener on service destruction
   */
  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  /**
   * Creates a TaskItemBoard object from Firestore data
   * @param {string} id - Task ID from Firestore
   * @param {any} obj - Task data from Firestore
   * @returns {TaskItemBoard} Formatted task object
   */
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

  /**
   * Gets Firestore collection reference for tasks
   * @returns Collection reference
   */
  getTasks() {
    return collection(this.firestore, 'taskItemBoard')
  }

  /**
   * Adds a new task to Firestore
   * @param {TaskItemBoard} task - Task to add
   * @returns {Promise<string>} Promise with new document ID
   */
  async addTasks(task: TaskItemBoard) {
    const docRef = await addDoc(collection(this.firestore, 'taskItemBoard'), task);
    this.taskConfirmation();
    return docRef.id;
  }

  /**
   * Toggles full card view for a task
   * @param {TaskItemBoard} task - Task to display
   */
  openFullCard(task: TaskItemBoard) {
    this.fullCardActive = !this.fullCardActive;
    this.selectedTask = task;
  }

  /**
   * Toggles edit overlay visibility
   */
  toggleEditOverlay() {
    this.editOverlayActive = !this.editOverlayActive;
  }

  /**
   * Toggles add task overlay visibility
   */
  toggleAddOverlay() {
    this.addCardActive = !this.addCardActive;
  }

  /**
   * Toggles add task overlay for specific column status
   * @param {string} status - Column status to add task to
   */
  toggleAddOverlayColumn(status: string) {
    this.taskcolumnStatus = status;
    if(window.innerWidth < 1300){
      this.router.navigate(['/task'])
    }else{
      this.addCardActive = !this.addCardActive;
    }
  }

  /**
   * Updates task subtasks in Firestore
   * @param {TaskItemBoard} task - Task with updated subtasks
   */
  async updateTaskFullcard(task: TaskItemBoard) {
    if (!task.id) return;
    const taskRef = doc(this.firestore, 'taskItemBoard', task.id);
    await updateDoc(taskRef, { subTaskFillTest: task.subTaskFillTest });
  }

  /**
   * Deletes a task from Firestore
   * @param {TaskItemBoard} task - Task to delete
   */
  async deleteTask(task: TaskItemBoard) {
    if (!task.id) return;
    await deleteDoc(doc(this.firestore, 'taskItemBoard', task.id))
  }

  /**
   * Shows task creation confirmation and navigates back to board
   */
  taskConfirmation() {
    const overlayRef = document.querySelector('.createdTask');
    overlayRef?.classList.add('display');
    this.addCardActive = false;
    
    setTimeout(() => {
      overlayRef?.classList.remove('display');
      this.router.navigate(['/board']);
    }, 1000);
  }

  
  showSignInOverlay(){
    const signInOverlay = document.querySelector('.sign-in-overlay');
    signInOverlay?.classList.remove('hidden')
    setTimeout(() => {
      signInOverlay?.classList.add('hidden');
    }, 2000);
  }
}

