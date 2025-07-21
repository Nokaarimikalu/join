import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from "../../../app/services/auth/auth.service";
import { BoardService } from "../../../app/services/board/board.service";
import { TaskItemBoard } from "../../../app/shared/interface/task.interface";



@Component({
  selector: 'app-summary-content',
  imports: [DatePipe],
  templateUrl: './summary-content.component.html',
  styleUrl: './summary-content.component.scss'
})
export class SummaryContentComponent {
  userEmail: string | null = null;
  filteredTasks: TaskItemBoard[] = [];

  today = new Date();


  constructor(private boardService: BoardService, private authService: AuthService) {
    this.userEmail = this.authService.loggedInUser(); // get auth mail 
    this.filteredTasks = this.boardService.taskList.filter(task =>
      task.assignedTo?.some(user => user.email === this.userEmail)
    );
    console.log(this.filteredTasks);

  }

  get todoCount(): number {
    return this.filteredTasks.filter(task => task.status === 'to do').length;
  }

  get doneCount(): number {
    return this.filteredTasks.filter(task => task.status === 'done').length;
  }

    get progressCount(): number {
    return this.filteredTasks.filter(task => task.status === 'in progress').length;
  }
      get feedbackCount(): number {
    return this.filteredTasks.filter(task => task.status === 'await feedback').length;
  }

  get urgentCount(): number {
    return this.filteredTasks.filter(task => task.priority === 'Urgent').length;
  }
  


get userFullName(): string {
  const userTask = this.filteredTasks.find(task => 
    task.assignedTo?.some(user => user.email === this.userEmail)
  );
  
  if (userTask) {
    const user = userTask.assignedTo?.find(u => u.email === this.userEmail);
    return `${user?.firstName} ${user?.lastName}` || 'Unknown User';
  }
  return 'Unknown User';
}
}
