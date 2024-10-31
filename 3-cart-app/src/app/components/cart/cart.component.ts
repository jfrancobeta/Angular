import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent {

  @Input() items: CartItem[] = []

  @Output() idProductEvent = new EventEmitter();

  @Input() total!:number;

  onDeleteCart(id: number){
    this.idProductEvent.emit(id)
  }

}
