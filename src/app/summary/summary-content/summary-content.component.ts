import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AuthService } from '../../../app/services/auth/auth.service';
import { BoardService } from '../../../app/services/board/board.service';
import { TaskItemBoard } from '../../../app/shared/interface/task.interface';
import { onSnapshot } from '@angular/fire/firestore';
import { Router, RouterModule } from '@angular/router';
import { OverlayState } from '../../services/contacts/overlayState.service';

@Component({
    selector: 'app-summary-content',
    imports: [ RouterModule],
    templateUrl: './summary-content.component.html',
    styleUrl: './summary-content.component.scss',
})
export class SummaryContentComponent {
    
    userEmail: string | null = null;

    loading = signal(true);

    today = new Date();

    currentGreeting = signal(this.timeGreeting());

    /**
     * Creates an instance of SummaryContentComponent
     * @param {BoardService} boardService - Service for board operations
     * @param {OverlayState} overlayState - Service for contact state management
     * @param {AuthService} authService - Authentication service
     * @param {Router} router - Angular router service
     */
    constructor(
        public boardService: BoardService,
        private overlayState: OverlayState,
        private authService: AuthService,
        private router: Router
    ) {
        this.userEmail = this.authService.loggedInUser();
        if (this.boardService.taskList.length > 0) {
            this.loading.set(false);
        } else {
            setTimeout(() => this.loading.set(false), 1500);
        }
        setInterval(() => this.currentGreeting.set(this.timeGreeting()), 60000);
    }

    /**
     * Returns time-appropriate greeting based on current hour
     * @returns {string} Appropriate greeting message
     */
    public timeGreeting(): string {
        const hour = new Date().getHours();

        if (hour < 5) return 'Good evening';
        else if (hour < 12) return 'Good morning';
        else if (hour < 18) return 'Good afternoon';
        else return 'Good evening';
    }

    /**
     * Gets count of 'to do' tasks assigned to current user
     * @returns {number} Count of to do tasks
     */
    get todoCount(): number {
        return this.boardService.taskList
/*             .filter((task) =>
                task.assignedTo?.some((user) => user.email === this.userEmail)
            ) */
            .filter((task) => task.status === 'to do').length;
    }

    /**
     * Gets count of 'done' tasks assigned to current user
     * @returns {number} Count of done tasks
     */
    get doneCount(): number {
        return this.boardService.taskList
/*             .filter((task) =>
                task.assignedTo?.some((user) => user.email === this.userEmail)
            ) */
            .filter((task) => task.status === 'done').length;
    }

    /**
     * Gets count of 'in progress' tasks assigned to current user
     * @returns {number} Count of in progress tasks
     */
    get progressCount(): number {
        return this.boardService.taskList
/*             .filter((task) =>
                task.assignedTo?.some((user) => user.email === this.userEmail)
            ) */
            .filter((task) => task.status === 'in progress').length;
    }

    /**
     * Gets count of 'await feedback' tasks assigned to current user
     * @returns {number} Count of await feedback tasks
     */
    get feedbackCount(): number {
        return this.boardService.taskList
/*             .filter((task) =>
                task.assignedTo?.some((user) => user.email === this.userEmail)
            ) */
            .filter((task) => task.status === 'await feedback').length;
    }

    /**
     * Gets count of urgent priority tasks assigned to current user
     * @returns {number} Count of urgent tasks
     */
    get urgentCount(): number {
        return this.boardService.taskList
/*             .filter((task) =>
                task.assignedTo?.some((user) => user.email === this.userEmail)
            ) */
            .filter((task) => task.priority === 'Urgent').length;
    }

    /**
     * Gets formatted date of nearest deadline among user's tasks
     * @returns {string} Formatted deadline date or empty string if no deadlines
     */
/*     get nextDeadline(): string { //user specific
        const userTasks = this.boardService.taskList.filter(task =>
            task.assignedTo?.some(user => user.email === this.userEmail) &&
            task.dueDate
        );
        if (userTasks.length === 0) return '';
        const closest = userTasks.reduce((prev, current) => {
            const prevDate = new Date(prev.dueDate!);
            const currentDate = new Date(current.dueDate!);
            return currentDate < prevDate ? current : prev;
        });
        return closest.dueDate ? new Date(closest.dueDate).toLocaleDateString() : '';
    } */

        get nextDeadline(): string {
    const tasksWithDueDate = this.boardService.taskList.filter(task => task.dueDate);
    if (tasksWithDueDate.length === 0) return '';
    const closest = tasksWithDueDate.reduce((prev, current) => 
        new Date(current.dueDate!) < new Date(prev.dueDate!) ? current : prev
    );
    return closest.dueDate ? new Date(closest.dueDate).toLocaleDateString() : '';
}

    /**
     * Gets full name of current user from contacts
     * @returns {string} User's full name or 'Guest' if not found
     */
    get userFullName(): string {
        const userContact = this.overlayState.contactList.find(
            (contact) => contact.email === this.userEmail
        );

        if (userContact) {
            return `${userContact.firstName} ${userContact.lastName}`;
        }
        return 'Guest';
    }

    /**
     * Gets all tasks assigned to current user
     * @returns {TaskItemBoard[]} Array of user's tasks
     */
    getFilteredTasks() {
        return this.boardService.taskList.filter((task) =>
            task.assignedTo?.some((user) => user.email === this.userEmail)
        );
    }
}