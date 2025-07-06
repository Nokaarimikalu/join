import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  toggleDropDown(){
    const dropDownRef = document.getElementById('drop-down');
    dropDownRef?.classList.toggle("d-none");
  }
}
