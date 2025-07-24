import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { CardComponent } from './card/card.component';
import { BoardService } from '../../services/board/board.service';
import { TaskItem, TaskItemBoard } from '../../shared/interface/task.interface';
import { FullCardComponent } from './full-card/full-card.component';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { doc, updateDoc } from '@angular/fire/firestore';
import { KanbanEditComponent } from '../kanban-edit/kanban-edit.component';
import { KanbanAddOverlayComponent } from '../../kanban-add-overlay/kanban-add-overlay.component';


@Component({
    selector: 'app-kanban-board',
    imports: [CardComponent, FullCardComponent, DragDropModule, KanbanAddOverlayComponent],
    templateUrl: './kanban-board.component.html',
    styleUrl: './kanban-board.component.scss'
})
export class KanbanBoardComponent {

    @Input() task!: TaskItemBoard;

    @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

    @ViewChild('searchInputMobile') searchInputMobile!: ElementRef<HTMLInputElement>;

    isDraggingMobile: boolean = false;
    startXMobile: number = 0;
    scrollLeftMobile: number = 0;
    containerMobile?: HTMLElement;
    searchValue: string = "";
    taskData: TaskItemBoard[] = [];

    /**
     * Initializes KanbanBoardComponent with task data
     * @param {BoardService} boardService - Service for board operations
     */
    constructor(public boardService: BoardService) {
        this.taskData = this.boardService.taskList;
    }

    /**
     * Filters tasks by status
     * @param {string} status - Status to filter by
     * @returns {TaskItemBoard[]} Filtered tasks
     */
    filterTaskStatus(status: string) {
        return this.boardService.taskList.filter(task => task.status === status);
    }

    /**
     * Searches tasks by title (desktop)
     * @returns {TaskItemBoard[]} Matching tasks
     */
    searchTasks() {
        this.searchInput.nativeElement.focus();
        const searchInputRef = document.querySelector('.searchTitle') as HTMLInputElement;
        this.searchValue = searchInputRef?.value;
        return this.boardService.taskList.filter(task => task.title?.toLocaleLowerCase() === searchInputRef?.value);
    }

    /**
     * Searches tasks by title (mobile)
     * @returns {TaskItemBoard[]} Matching tasks
     */
    searchTasksMobile() {
        this.searchInputMobile.nativeElement.focus();
        const searchInputRef = document.querySelector('.searchTitleMobile') as HTMLInputElement;
        this.searchValue = searchInputRef?.value;
        return this.boardService.taskList.filter(task => task.title?.toLocaleLowerCase() === searchInputRef?.value);
    }

    /**
     * Filters tasks by status and search term
     * @param {string} status - Status to filter by
     * @param {string} searchValue - Search term
     * @returns {TaskItemBoard[]} Filtered tasks
     */
    tasksSearchAndStatus(status: string, searchValue: string) {
        const filteredStatus = this.filterTaskStatus(status);
        return filteredStatus.filter(task => task.title?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
    }

    /**
     * Handles task drag and drop between columns
     * @param {CdkDragDrop<TaskItemBoard[]>} event - Drag drop event
     */
    async drop(event: CdkDragDrop<TaskItemBoard[]>) {
        const prevStatus = event.previousContainer.id;
        const newStatus = event.container.id;
        const tasks = this.boardService.taskList;
        const targetTasks = tasks.filter(t => t.status === newStatus);
        
        if (prevStatus === newStatus) {
            moveItemInArray(targetTasks, event.previousIndex, event.currentIndex);
        } else {
            const movedTask = tasks.find(t => t.id === event.item.data.id);
            if (movedTask) {
                movedTask.status = newStatus;
                const taskRef = doc(this.boardService.firestore, 'taskItemBoard', movedTask.id);
                await updateDoc(taskRef, { status: newStatus });
                const updated = tasks.filter(t => t.status !== newStatus);
                const newTargetTasks = tasks.filter(t => t.status === newStatus && t.id !== movedTask.id);
                newTargetTasks.splice(event.currentIndex, 0, movedTask);
                this.boardService.taskList = [...updated, ...newTargetTasks];
                return;
            }
        }
        this.boardService.taskList = [...tasks.filter(t => t.status !== newStatus), ...targetTasks];
    }

    /**
     * Starts mobile drag operation
     * @param {MouseEvent|TouchEvent} e - Start event
     */
    startDragMobile(e: MouseEvent | TouchEvent) {
        this.containerMobile = (e.currentTarget as HTMLElement).parentElement!;
        this.isDraggingMobile = true;
        this.startXMobile = ('pageX' in e ? e.pageX : e.touches[0].pageX) - this.containerMobile.offsetLeft;
        this.scrollLeftMobile = this.containerMobile.scrollLeft;
    }

    /**
     * Handles mobile drag movement
     * @param {MouseEvent|TouchEvent} e - Drag event
     */
    onDragMobile(e: MouseEvent | TouchEvent) {
        if (!this.isDraggingMobile || !this.containerMobile) return;
        e.preventDefault();
        const x = ('pageX' in e ? e.pageX : e.touches[0].pageX) - this.containerMobile.offsetLeft;
        const walk = (x - this.startXMobile) * 2;
        this.containerMobile.scrollLeft = this.scrollLeftMobile - walk;
    }

    /**
     * Ends mobile drag operation
     */
    endDragMobile() {
        this.isDraggingMobile = false;
    }
}