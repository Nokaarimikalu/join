import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-footer',
  imports: [RouterLink],
  templateUrl: './nav-footer.component.html',
  styleUrl: './nav-footer.component.scss'
})
export class NavFooterComponent implements OnInit {

  /**
   * Creates an instance of NavFooterComponent
   * @param {Router} router - Angular router service for navigation
   */
  constructor(private router: Router) {}

  /**
   * Initializes component and sets up route change listener
   */
  ngOnInit(): void {
    this.setActiveBaseOnRoute();

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavFooterComponent) {
        this.setActiveBaseOnRoute();
      }
    });
  }

  /**
   * Sets active state based on current route
   */
  setActiveBaseOnRoute(): void {
    const path = this.router.url.split('/')[1];
    this.toggleActive(path);
  }

  /**
   * Toggles active state for navigation items based on current route
   * @param {string} state - Current route path segment
   */
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
      case 'privacy':
        this.runImpLegalCase();
        break;
      case 'legalNotice':
        this.runImpLegalCase();
        break;
      default:
        break;
    }
  }

  /**
   * Closes the help overlay and resets help button states
   */
  closeHelp() {
    const helpRef = document.querySelector('#help-me-overlay');
    helpRef?.classList.add('hidden');
    const helpButtonRef = document.querySelector('.help-button-header');
    helpButtonRef?.classList.remove('hidden');
    const helpDropdownRef = document.querySelector('.help-button-dropdown');
    helpDropdownRef?.classList.remove('hidden');
  }

  /**
   * Sets active state for elements matching the given selector
   * @param {string} path - CSS selector for elements to activate
   */
  runCase(path: string): void {
    const currentElements = document.querySelectorAll(path);
    currentElements?.forEach((element: { classList: { add: (arg0: string) => void; }; }) => {
      element.classList.add('active');
    });
  }

  /**
   * Handles special case for legal/privacy routes by hiding help buttons
   */
  runImpLegalCase() {
    const helpButtonRef = document.querySelector('.help-button-header');
    const helpDropdownRef = document.querySelector('.help-button-dropdown');
    helpButtonRef?.classList.add('hidden');
    helpDropdownRef?.classList.add('hidden');
  }
}