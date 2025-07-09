import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
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
