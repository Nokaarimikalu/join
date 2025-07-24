import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelpMeComponent } from "./shared/help-me/help-me.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HelpMeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'join';
}
