import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CatalogComponent } from "./catalog/catalog.component";
import { CartItem } from '../models/cartitem';
import { NavbarComponent } from "./navbar/navbar.component";
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit, OnChanges{


  items: CartItem[] = []

  total: number = 0;

 

  constructor(
    private router: Router,
    private serviceData : SharingDataService){
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {

   
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || []
    this.getTotal()
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(){
    this.serviceData.productEvent.subscribe(product => {
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
      this.router.navigate(['/cart'], {
        state: {items: this.items, total: this.total}
      })
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Producto agregado"
      });
    })
    
  }
  onDeleteCart(){
    this.serviceData.idproductEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.items = this.items.filter(item => item.product.id != id);
          this.savaSession()
          this.getTotal();
          this.router.navigateByUrl('/',{skipLocationChange: true}).then(() => {

            this.router.navigate(['/cart'], {
              state: {items: this.items, total: this.total}
            })
          })
          Swal.fire({
            title: "Deleted!",
            text: "Your Product has been deleted.",
            icon: "success"
          });
        }
      });
     
     
     

      
      
    })
  }

  getTotal() {
    this.total = this.items.reduce((accumulator, item) => accumulator + item.quantity * item.product.price,0);
  }

  savaSession(){
    sessionStorage.setItem('cart',JSON.stringify(this.items))
  }

  
}
