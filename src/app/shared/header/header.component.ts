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
    const dropDownRef = document.getElementById('drop-down');
    dropDownRef?.classList.toggle("d-none");
  }
}
