import { Component } from '@angular/core';
import { NavFooterComponent } from "../nav-footer/nav-footer.component";
import { HeaderComponent } from "../header/header.component";
import { NavFooterMobileComponent } from "../nav-footer-mobile/nav-footer-mobile.component";
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { Head } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-help-me',
  imports: [NavFooterComponent, HeaderComponent, NavFooterMobileComponent],
  templateUrl: './help-me.component.html',
  styleUrl: './help-me.component.scss'
})
export class HelpMeComponent {

  constructor(private router:Router){
    
  }

  hideHelp(){
    const helpRef = document.querySelector('#help-me-overlay');
    const helpButtonRef = document.querySelectorAll('.help-button-header');
    helpButtonRef.forEach(element => {
      element.classList.toggle('hidden');
    });
    const path = this.router.url.split('/')[1];
    this.toggleActive(path);
    helpRef?.classList.toggle('hidden');
  }

  toggleActive(state:string):void{
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
      default:
        break;
    }
  }

  runCase(path:string):void{
    const currentElements = document.querySelectorAll(path);
        currentElements?.forEach((element: { classList: { add: (arg0: string) => void; }; }) => {
        element.classList.add('active');});
  }

}
