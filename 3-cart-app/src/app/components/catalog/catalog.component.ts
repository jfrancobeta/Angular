import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from "../product-card/product-card.component";
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {

  products!: Product[];

 

  constructor(
    private productService: ProductService,
    private router: Router, 
    private service :SharingDataService){
  }
  ngOnInit(): void {
    if(!this.products){
      this.products = this.productService.findAll()
    }
  }
  onAddCart(product: Product){
    this.service.productEvent.emit(product)

  }
}
