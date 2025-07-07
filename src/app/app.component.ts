import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfoScreenComponent } from './contacts/info-screen/info-screen.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InfoScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Join';
}
