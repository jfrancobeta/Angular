import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OutgoingMessage } from 'node:http';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit{//inyeccion de dependencias 
  counter: number = 0;

  @Input() title: String = "";

  @Output() counterEmiter: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {//en estos casos se guarda solo hasta que se recarga no en el contexto del navegador
   this.counter = parseInt(sessionStorage.getItem("counter")!) || 0; // para navegador seria Localstorage y solo si recarga sessionStorege 
   console.log("creado el componente")
  }

 

  setCounter(): void{
    this.counter++;
    sessionStorage.setItem("counter", this.counter.toString());//guardar en session storage
    this.counterEmiter.emit(this.counter);
  }

}
