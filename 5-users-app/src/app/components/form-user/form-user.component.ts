import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-user.component.html',

})
export class FormUserComponent {

  @Input() user!: User;

  @Output() newUserEvent = new EventEmitter();

  constructor(){
    this.user = new User();
  }

  onSubmit(userForm: NgForm){
    if(userForm.valid){
      this.newUserEvent.emit({... this.user})
      console.log(this.user)

    }
    userForm.reset()
    
  }
  onClear(userForm: NgForm){
    userForm.reset();
    this.user = new User();
  }

}
