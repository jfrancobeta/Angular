import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/item';
import { RowItemComponent } from '../row-item/row-item.component';

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [CommonModule, RowItemComponent],
  templateUrl: './list-items.component.html'
})
export class ListItemsComponent {

  @Input() items!: Item[];

  @Output() removeEvent: EventEmitter<number> = new EventEmitter();

  onRemove(id:number){
    this.removeEvent.emit(id)
  }

}
