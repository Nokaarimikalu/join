import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  toggleDropDown(){
    const dropDownRef = document.querySelector('#drop-down');
    const overlayRef = document.querySelector('#overlay');
    const spanRef = document.querySelector('#user');
    dropDownRef?.classList.toggle("hidden");
    overlayRef?.classList.toggle("hidden");
    spanRef?.classList.toggle("active");
  }

}
