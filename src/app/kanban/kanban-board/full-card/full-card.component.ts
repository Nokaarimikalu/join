import { Component, Input } from '@angular/core';
import { BoardService } from '../../../services/board/board.service';
import { TaskItem, TaskItemBoard } from '../../../shared/interface/task.interface';
import { FormsModule } from '@angular/forms';
import { KanbanEditComponent } from '../../kanban-edit/kanban-edit.component';



@Component({
  selector: 'app-full-card',
  imports: [FormsModule, KanbanEditComponent],
  templateUrl: './full-card.component.html',
  styleUrl: './full-card.component.scss'
})


export class FullCardComponent {

  checkboxActive: boolean = false;
  subTasks: any[] = [];


  constructor(public boardService: BoardService) {
  }


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
    if (this.task.subTaskFillTest) {
      this.subTasks = Array.from(this.task.subTaskFillTest.values());
    }
    
    console.log(this.subTasks);
  }
  
  toggleCheckbox(subtaskIndex: number) {
    const subtask = this.task.subTaskFillTest[subtaskIndex].values().next().value;
    // if (this.task?.subTaskFillTest?.[subtaskIndex]) {
    //   this.task.subTaskFillTest[subtaskIndex].completed = !this.task.subTaskFillTest[subtaskIndex].completed;
    // }
    
    if (subtask) {
      subtask.completed = !subtask.completed;
    }

  }


}
