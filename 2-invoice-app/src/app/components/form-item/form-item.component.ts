import { Component, EventEmitter, Output } from '@angular/core';
import { Item } from '../../models/item';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-item.component.html'
})
export class FormItemComponent {

  @Output() addItemEvent = new EventEmitter();

  private counterId = 4;

  item: any = {
    product: '',
    price: '',
    quantity: '',
  }

  onSubmit(itemForm: NgForm){
    if(itemForm.valid){

      this.addItemEvent.emit({id:this.counterId,...this.item})
      this.counterId++;
      this.item = {
        product: '',
        price: '',
        quantity: '',
      }
      // itemForm.reset();
      itemForm.resetForm();
    }

  }
}
