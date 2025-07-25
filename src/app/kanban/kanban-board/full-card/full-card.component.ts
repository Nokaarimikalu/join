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

    /**
     * Creates an instance of FullCardComponent.
     * @param {BoardService} boardService - Service for board operations
     */
    constructor(public boardService: BoardService) {
    }

    @Input() task!: TaskItemBoard;

    /**
     * Toggles the completion status of a subtask and updates the task
     * @param {number} subtaskIndex - The index of the subtask to toggle
     */
    toggleCheckbox(subtaskIndex: number) {
        this.task.subTaskFillTest[subtaskIndex].completed = !this.task.subTaskFillTest[subtaskIndex].completed;
        this.boardService.updateTaskFullcard(this.task);
    }
}
