import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from "./counter/counter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CounterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'hola mundo';

  subTitle = "contador con estado de session";
  
  nombre = "juan david franco";
  users = ["martin","yulder","diego"]

  visible: boolean = false;

  counter = 0;

  ngOnInit(): void {
    this.counter = parseInt(sessionStorage.getItem("counter")!) || 0;
  }

  setVisible(): void {
    this.visible = !this.visible;
  }

  setCounter(counter:number) : void{
    this.counter = counter;

  }
}
