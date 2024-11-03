import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reduce';
import { total } from '../../store/items.actions';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit{

  items: CartItem[] = []


  total!:number;

  constructor(
    private servicio: SharingDataService, 
    private store: Store<{items: ItemsState}>){
      this.store.select('items').subscribe(state => {

        this.items = state.items
        this.total = state.total
        
      })
  }
  ngOnInit(): void {
    console.log('inicio de cart')
    this.store.dispatch(total())
  }

  onDeleteCart(id: number){
    this.servicio.idproductEventEmitter.emit(id)
  }

}
