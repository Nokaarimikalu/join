import { Component, Input } from '@angular/core';
import { BoardService } from '../../../services/board/board.service';
import { TaskItem, TaskItemBoard } from '../../../shared/interface/task.interface';
import { CdkDrag } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-card',
  imports: [CdkDrag],
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
}