import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  
  private _idproductEventEmitter: EventEmitter<number> = new EventEmitter();

  private _productEvent: EventEmitter<Product> = new EventEmitter();
  
  constructor() { }

  get idproductEventEmitter(){
    return this._idproductEventEmitter;
  }

  get productEvent(){
    return this._productEvent;
  }
}
