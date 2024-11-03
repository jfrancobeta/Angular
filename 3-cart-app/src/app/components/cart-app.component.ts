import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CatalogComponent } from "./catalog/catalog.component";
import { CartItem } from '../models/cartitem';
import { NavbarComponent } from "./navbar/navbar.component";
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { ItemsState } from '../store/items.reduce';
import { add, remove, total } from '../store/items.actions';
@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit, OnChanges{


  items: CartItem[] = []



  constructor(
    private router: Router,
    private serviceData : SharingDataService,
    private store: Store<{items: ItemsState}>){
    this.store.select('items').subscribe(state => {
      this.items = state.items;
      this.savaSession()
      console.log('cambio de estado')
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    //this.store.dispatch(total())
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(){
    this.serviceData.productEvent.subscribe(product => {
      this.store.dispatch(add({product}))
      this.store.dispatch(total())
      
     
      
      this.router.navigate(['/cart'])

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
          this.store.dispatch(remove({id}))
          this.store.dispatch(total())
          
          // this.getTotal();
          this.router.navigateByUrl('/',{skipLocationChange: true}).then(() => {

            this.router.navigate(['/cart'])
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


  savaSession(){
    sessionStorage.setItem('cart',JSON.stringify(this.items))
  }

  
}
