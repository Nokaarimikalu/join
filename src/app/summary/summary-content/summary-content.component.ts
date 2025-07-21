import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AuthService } from "../../../app/services/auth/auth.service";
import { BoardService } from "../../../app/services/board/board.service";
import { TaskItemBoard } from "../../../app/shared/interface/task.interface";
import { onSnapshot } from '@angular/fire/firestore';



@Component({
  selector: 'app-summary-content',
  imports: [DatePipe],
  templateUrl: './summary-content.component.html',
  styleUrl: './summary-content.component.scss'
})

export class SummaryContentComponent {
  userEmail: string | null = null;

  loading = signal(true);

  today = new Date();

  currentGreeting = signal(this.timeGreeting());



  constructor(private boardService: BoardService, private authService: AuthService) {
    this.userEmail = this.authService.loggedInUser(); // get auth mail
    if (this.boardService.taskList.length > 0) {
      this.loading.set(false);
    } else {
      setTimeout(() => this.loading.set(false), 1500);
    }
    setInterval(() => this.currentGreeting.set(this.timeGreeting()), 60000);
    console.log("Aktuelle Stunde:", new Date().getHours());

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
      .filter(task => task.assignedTo?.some(user => user.email === this.userEmail))
      .filter(task => task.status === 'to do').length;
  }

  get doneCount(): number {
    return this.boardService.taskList.filter(task => task.status === 'done').length;
  }

  get progressCount(): number {
    return this.boardService.taskList.filter(task => task.status === 'in progress').length;
  }
  get feedbackCount(): number {
    return this.boardService.taskList.filter(task => task.status === 'await feedback').length;
  }

  get urgentCount(): number {
    return this.boardService.taskList.filter(task => task.priority === 'Urgent').length;
  }

  get userFullName(): string {
    const userTask = this.boardService.taskList.find(task =>
      task.assignedTo?.some(user => user.email === this.userEmail)
    );

    if (userTask) {
      const user = userTask.assignedTo?.find(u => u.email === this.userEmail);
      return `${user?.firstName} ${user?.lastName}` || 'Unknown User';
    }
    return 'Unknown User';
  }
  getFilteredTasks() {
    return this.boardService.taskList.filter(
      task => task.assignedTo?.some(user => user.email === this.userEmail)
    );
  }
}
