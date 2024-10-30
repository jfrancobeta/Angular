import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() items!: CartItem[];

  @Output() openCart = new EventEmitter;
  
  setShowCard(){
    this.openCart.emit();
  }

}
