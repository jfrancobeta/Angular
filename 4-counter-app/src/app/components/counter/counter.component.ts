import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../../store/items.action';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  title: string = "counter usando redux"
  counter: number = 0;

  constructor(private store: Store<{counter:number}>){
    this.store.select('counter').subscribe(counter =>{
      this.counter= counter;
    })
  }
  increment(){
    //this.counter++
    this.store.dispatch(increment({mul:2}))
    console.log('incrementar')
  }
  decrement(){
    console.log('descrementar')
    this.store.dispatch(decrement({mul:3}))
    //this.counter--
  }
  reset(){
    console.log('reset')
    this.store.dispatch(reset())
    //this.counter = 0;
  }
}
