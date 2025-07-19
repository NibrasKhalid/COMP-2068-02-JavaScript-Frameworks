import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');

  counter = 0;
  incrementCounter(): void {
    this.counter++;
  }
  deccrementCounter(): void {
    this.counter--;
  }
}


