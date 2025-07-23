import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { BoardService } from '../../services/board/board.service';
import { AppComponent } from '../../app.component';
import { OverlayState } from '../../services/contacts/overlayState.service';


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userEmail: string | null = null;
  helpOpen: boolean = false;

  constructor(private boardService: BoardService, private router: Router, private overlayState: OverlayState) {
    this.userEmail = this.authService.loggedInUser(); // get auth mail

  }

  authService = inject(AuthService);

  toggleDropDown() {
    const dropDownRef = document.querySelectorAll('#drop-down');
    const overlayRef = document.querySelectorAll('#overlay');
    const spanRef = document.querySelector('#user');
    dropDownRef?.forEach(element => {
      element.classList.toggle('hidden');
    });
    overlayRef?.forEach(element => {
      element.classList.toggle('hidden');
    });
    spanRef?.classList.toggle("active");
  }

  closeDropDown(){
    const dropDownRef = document.querySelectorAll('#drop-down');
    const overlayRef = document.querySelectorAll('#overlay');
    dropDownRef?.forEach(element => {
      element.classList.remove('hidden');
    });
    overlayRef?.forEach(element => {
      element.classList.remove('hidden');
    });
  }
  

  logOut() {
    this.authService.logout();
  }

  toggleHelp() {
    const helpRef = document.querySelector('#help-me-overlay');
    helpRef?.classList.toggle('hidden');

    const path = this.router.url.split('/')[1];
    this.toggleActive(path);

    const helpButtonRef = document.querySelectorAll('.help-button-header');
    helpButtonRef.forEach(element => {
      element.classList.toggle('hidden');
    });
    const helpDropdownRef = document.querySelectorAll('.help-button-dropdown');
    helpDropdownRef.forEach(element => {
      element.classList.toggle('hidden');
    })
    const activeElements = document.querySelectorAll('.active');
    activeElements.forEach(element => {
      element.classList.remove('active');
    });
  }

  toggleActive(state: string): void {
    const activeElements = document.querySelectorAll('.active');
    activeElements.forEach(element => {
      element.classList.remove('active');
    });
    switch (state) {
      case 'summary':
        this.runCase('.summary')
        break;
      case 'task':
        this.runCase('.task')
        break;
      case 'board':
        this.runCase('.board')
        break;
      case 'contacts':
        this.runCase('.contacts')
        break;
      case 'legalNotice':
      default:
        break;
    }
  }

  runCase(path: string): void {
    const currentElements = document.querySelectorAll(path);
    currentElements?.forEach((element: { classList: { add: (arg0: string) => void; }; }) => {
      element.classList.add('active');
    });
  }

  closeHelp() {
    const helpRef = document.querySelector('#help-me-overlay');
    helpRef?.classList.add('hidden');

  }

    get initialsUser(): string {
    const userContact = this.overlayState.contactList.find(
      (contact) => contact.email === this.userEmail
    );

    if (userContact) {
      return `${userContact.initials}`;
    }
    return '';
  }

}
