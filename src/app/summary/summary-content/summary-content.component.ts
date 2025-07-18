import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-summary-content',
  imports: [DatePipe],
  templateUrl: './summary-content.component.html',
  styleUrl: './summary-content.component.scss'
})
export class SummaryContentComponent {
today = new Date();
}
