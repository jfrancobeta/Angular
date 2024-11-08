import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserAppComponent } from "./components/user-app.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserAppComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'users-app';
}
