import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  authService = inject(AuthService);

  toggleDropDown(){
    const dropDownRef = document.querySelector('#drop-down');
    const overlayRef = document.querySelector('#overlay');
    const spanRef = document.querySelector('#user');
    dropDownRef?.classList.toggle("hidden");
    overlayRef?.classList.toggle("hidden");
    spanRef?.classList.toggle("active");
  }

  logOut(){
    this.authService.logout();
  }
}
