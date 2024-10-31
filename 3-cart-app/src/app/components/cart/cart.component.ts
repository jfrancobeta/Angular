import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent {

  items: CartItem[] = []


  total!:number;

  constructor(private router: Router,private servicio: SharingDataService){
    this.items = this.router.getCurrentNavigation()?.extras.state!['items']
    this.total = this.router.getCurrentNavigation()?.extras.state!['total']
  }

  onDeleteCart(id: number){
    this.servicio.idproductEventEmitter.emit(id)
  }

}
