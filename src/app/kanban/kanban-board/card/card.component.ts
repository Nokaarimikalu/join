import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { BoardService } from '../../../services/board/board.service';
import { doc, updateDoc } from '@angular/fire/firestore';

import { TaskItem, TaskItemBoard } from '../../../shared/interface/task.interface';
import { CdkDrag } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-card',
  imports: [CommonModule, CdkDrag],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent {
  
  constructor(public boardService: BoardService) {}

  @Input() task!: TaskItemBoard;
  ngOnInit() {
    if (this.boardService.taskList && this.task) {
      const updatedTask = this.boardService.taskList.find(
        (t: TaskItemBoard) => t.id === this.task.id
      );
      if (updatedTask) {
        this.task = updatedTask;
      }
    }
  }
  
  get completedSubtasks(): number {
    if (!this.task.subTaskFillTest) return 0;
    return this.task.subTaskFillTest.filter((s: any) => s.completed).length;
  }

  get totalSubtasks(): number {
    if (!this.task.subTaskFillTest) return 0;
    return this.task.subTaskFillTest.length;
  }

  get subtaskProgress(): number {
    if (this.totalSubtasks === 0) return 0;
    return (this.completedSubtasks / this.totalSubtasks) * 100;
  }

  showMobileOverlay = false; 

  openMobileOverlay(event: Event) {
    event.stopPropagation();
    this.showMobileOverlay = true;
  }

async setStatus(status: string) {
  this.task.status = status;
  const taskIndex = this.boardService.taskList.findIndex(t => t.id === this.task.id);
  if (taskIndex > -1) {
    this.boardService.taskList[taskIndex].status = status;
    try {
      const taskRef = doc(this.boardService.firestore, 'taskItemBoard', this.task.id);
      await updateDoc(taskRef, { status: status });
    } catch (error) {
      console.error('Error updating status in Firestore:', error);
    }
  }
  
  this.showMobileOverlay = false;
}

  closeOverlayStatus(){
    this.showMobileOverlay = false;
  }

}