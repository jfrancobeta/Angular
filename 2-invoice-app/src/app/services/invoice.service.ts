import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { invoiceData } from '../data/invoice.data';
import { Item } from '../models/item';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private invoice : Invoice = invoiceData;
  constructor() { }

  getInvoice(): Invoice{
    const total = this.getTotal()
    return { ...this.invoice, total};
  }

  getTotal(){
    let total = 0;
    
    this.invoice.items.forEach( item => {
      total += (item.price * item.quantity);
    })
    return total;
  }

  delete(id:number): Invoice{
    this.invoice.items = this.invoice.items.filter(item => item.id != id);
    const total = this.getTotal()
    return {... this.invoice, total};
  }

  addItem(item: Item): Invoice{
    this.invoice.items = [... this.invoice.items, item]
    const total = this.getTotal()
    return {... this.invoice, total};
  }
}
