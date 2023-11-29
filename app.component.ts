import { Component } from '@angular/core';
import mockData from './mock-data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PS6';
  data = [];
  hasData = false;

  fetchData() {
    this.data = mockData;
    this.hasData = true;
  }
}
