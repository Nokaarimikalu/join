import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { BoardService } from '../../services/board/board.service';


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userEmail: string | null = null;

  constructor(private boardService: BoardService) {
    this.userEmail = this.authService.loggedInUser(); // get auth mail

  }

  authService = inject(AuthService);

  toggleDropDown() {
    const dropDownRef = document.querySelector('#drop-down');
    const overlayRef = document.querySelector('#overlay');
    const spanRef = document.querySelector('#user');
    dropDownRef?.classList.toggle("hidden");
    overlayRef?.classList.toggle("hidden");
    spanRef?.classList.toggle("active");
  }

  logOut() {
    this.authService.logout();
  }

get initialsUser(): string {
  const userTask = this.boardService.taskList.find(task => 
    task.assignedTo?.some(user => user.email === this.authService.loggedInUser())
  );
  return userTask?.assignedTo?.find(user => user.email === this.authService.loggedInUser())?.initials || '?';
}
}
