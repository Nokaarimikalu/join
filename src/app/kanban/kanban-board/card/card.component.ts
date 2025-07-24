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

    showMobileOverlay: boolean = false;

    @Input() task!: TaskItemBoard;

    /**
     * Creates an instance of CardComponent.
     * @param {BoardService} boardService - Service for board operations
     */
    constructor(public boardService: BoardService) { }

    /**
     * Initializes component and updates task data from boardService
     */
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

    /**
     * Gets the number of completed subtasks
     * @returns {number} Number of completed subtasks
     */
    get completedSubtasks(): number {
        if (!this.task.subTaskFillTest) return 0;
        return this.task.subTaskFillTest.filter((s: any) => s.completed).length;
    }

    /**
     * Gets the total number of subtasks
     * @returns {number} Total number of subtasks
     */
    get totalSubtasks(): number {
        if (!this.task.subTaskFillTest) return 0;
        return this.task.subTaskFillTest.length;
    }

    /**
     * Calculates the progress percentage of subtasks
     * @returns {number} Percentage of completed subtasks
     */
    get subtaskProgress(): number {
        if (this.totalSubtasks === 0) return 0;
        return (this.completedSubtasks / this.totalSubtasks) * 100;
    }

    /**
     * Opens the mobile overlay for status change
     * @param {Event} event - The click event
     */
    openMobileOverlay(event: Event) {
        event.stopPropagation();
        this.showMobileOverlay = true;
    }

    /**
     * Updates task status in both local state and Firestore
     * @param {string} status - The new status to set
     */
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

    /**
     * Closes the status overlay
     */
    closeOverlayStatus() {
        this.showMobileOverlay = false;
    }
}