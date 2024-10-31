import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogComponent } from "./catalog/catalog.component";
import { CartComponent } from "./cart/cart.component";
import { CartItem } from '../models/cartitem';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CatalogComponent, CartComponent, NavbarComponent],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit, OnChanges{

  products: Product[] = []

  items: CartItem[] = []

  total: number = 0;

  showCard: boolean = false;

  constructor(private service: ProductService){
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.products = this.service.findAll();
   
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || []
    this.getTotal()
  }

  onAddCart(product: Product){
    const HasIteem = this.items.find(item => {
      return item.product.id === product.id
    })
    if(HasIteem){
      this.items = this.items.map(item => {
        if(item.product.id === product.id ){
          return {
            ... item,
            quantity: item.quantity +1
          }
          
        }else{
          return item;
        }
      })
    }else{
      this.items = [... this.items, {product:{ ... product}, quantity:1}]
    }
    
    this.savaSession()
    this.getTotal();
  }
  onDeleteCart(id : number){
    this.items = this.items.filter(item => item.product.id != id);
   
    this.savaSession()
    this.getTotal();
  }

  getTotal() {
    this.total = this.items.reduce((accumulator, item) => accumulator + item.quantity * item.product.price,0);
  }

  savaSession(){
    sessionStorage.setItem('cart',JSON.stringify(this.items))
  }

  setShowCard(){
    this.showCard = !this.showCard;
  }
}
