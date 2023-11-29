// main.component.ts
import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent {
  data: any[];

  constructor(private dataService: DataService) {}

  handleQuery(term: string) {
    this.dataService.queryBackend(term).subscribe(response => {
      this.data = response;
    });
  }
}
