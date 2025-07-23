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
  imports: [DatePipe, RouterModule],
  templateUrl: './summary-content.component.html',
  styleUrl: './summary-content.component.scss',
})
export class SummaryContentComponent {
  userEmail: string | null = null;

  loading = signal(true);

  today = new Date();

  currentGreeting = signal(this.timeGreeting());

  constructor(
    private boardService: BoardService,
    private overlayState: OverlayState,
    private authService: AuthService,
    private router: Router
  ) {
    this.userEmail = this.authService.loggedInUser(); // get auth mail
    if (this.boardService.taskList.length > 0) {
      this.loading.set(false);
    } else {
      setTimeout(() => this.loading.set(false), 1500);
    }
    setInterval(() => this.currentGreeting.set(this.timeGreeting()), 60000);
    console.log('Aktuelle Stunde:', new Date().getHours());
  }

  public timeGreeting(): string {
    const hour = new Date().getHours();

    if (hour < 5) return 'Good evening';
    else if (hour < 12) return 'Good morning';
    else if (hour < 18) return 'Good afternoon';
    else return 'Good evening';
  }

  get todoCount(): number {
    return this.boardService.taskList
      .filter((task) =>
        task.assignedTo?.some((user) => user.email === this.userEmail)
      )
      .filter((task) => task.status === 'to do').length;
  }

  get doneCount(): number {
    return this.boardService.taskList
      .filter((task) =>
        task.assignedTo?.some((user) => user.email === this.userEmail)
      )
      .filter((task) => task.status === 'done').length;
  }

  get progressCount(): number {
    return this.boardService.taskList
      .filter((task) =>
        task.assignedTo?.some((user) => user.email === this.userEmail)
      )
      .filter((task) => task.status === 'in progress').length;
  }
  get feedbackCount(): number {
    return this.boardService.taskList
      .filter((task) =>
        task.assignedTo?.some((user) => user.email === this.userEmail)
      )
      .filter((task) => task.status === 'await feedback').length;
  }

  get urgentCount(): number {
    return this.boardService.taskList
      .filter((task) =>
        task.assignedTo?.some((user) => user.email === this.userEmail)
      )
      .filter((task) => task.priority === 'Urgent').length;
  }

  get userFullName(): string {
    const userContact = this.overlayState.contactList.find(
      (contact) => contact.email === this.userEmail
    );

    if (userContact) {
      return `${userContact.firstName}`;
    }
    return 'Guest';
  }

  getFilteredTasks() {
    return this.boardService.taskList.filter((task) =>
      task.assignedTo?.some((user) => user.email === this.userEmail)
    );
  }
}
