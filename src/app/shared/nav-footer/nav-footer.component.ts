import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-footer',
  imports: [RouterLink],
  templateUrl: './nav-footer.component.html',
  styleUrl: './nav-footer.component.scss'
})
export class NavFooterComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setActiveBaseOnRoute();

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavFooterComponent) {
        this.setActiveBaseOnRoute();
      }
    }
    );
  }

  setActiveBaseOnRoute():void {
    const path = this.router.url.split('/')[1];
    this.toggleActive(path);
  }

  toggleActive(state:string):void{
    const activeElements = document.querySelectorAll('.active');
    const helpButtonRef = document.querySelectorAll('.help-button-header');
    const helpDropdownRef = document.querySelectorAll('.help-button-dropdown');
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
      case 'privacy':
        helpButtonRef.forEach(element => {
          element.classList.add('hidden');
        });
        helpDropdownRef.forEach(element => {
          element.classList.add('hidden');
        });
        break
      case 'legalNotice':
        helpButtonRef.forEach(element => {
          element.classList.add('hidden');
        });
        helpDropdownRef.forEach(element => {
          element.classList.add('hidden');
        });
        break;
      default:
        this.runCase('.summary');
        break;
    }
  }

  closeHelp(){
    const helpRef = document.querySelector('#help-me-overlay');
    helpRef?.classList.add('hidden');
    const helpButtonRef = document.querySelectorAll('.help-button-header');
      helpButtonRef.forEach(element => {
      element.classList.remove('hidden');
    });
    const helpDropdownRef = document.querySelectorAll('.help-button-dropdown');
      helpDropdownRef.forEach(element => {
      element.classList.remove('hidden');
    })
  }

  runCase(path:string):void{
    const currentElements = document.querySelectorAll(path);
        currentElements?.forEach((element: { classList: { add: (arg0: string) => void; }; }) => {
        element.classList.add('active');});
  }
}
