import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from "../product-card/product-card.component";
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';
import { Store } from '@ngrx/store';
import { ProductState } from '../../store/products.reducer';
import { findAll, load } from '../../store/products.actions';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {

  products!: Product[];

 

  constructor(
    private store: Store<{products: ProductState}>,
    private productService: ProductService, 
    private service :SharingDataService){
      this.store.select('products').subscribe(state =>{
        this.products = state.products
      })
  }
  ngOnInit(): void {
    // this.store.dispatch(load({products:this.productService.findAll()}))
    //effects
    this.store.dispatch(findAll())
  }
  onAddCart(product: Product){
    this.service.productEvent.emit(product)

  }
}
