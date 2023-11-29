// results.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultsComponent {
  @Input() data: any[];
}
