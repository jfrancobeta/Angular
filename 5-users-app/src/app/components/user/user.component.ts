import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent {

  @Input() users!: User[]

  @Output() idEventEmiter= new EventEmitter()

  @Output() selectUserEvent = new EventEmitter();

  constructor(){

  }

  onDelete(id:number){
    
      this.idEventEmiter.emit(id);

    
  }

  onSelectedUser(user: User){
    this.selectUserEvent.emit(user)
  }
}
