import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-user.component.html',

})
export class FormUserComponent {

  user: User;

  

  constructor(private data: SharingDataService, 
    private router: Router
  ){
    if(this.router.getCurrentNavigation()?.extras.state){

      this.user = this.router.getCurrentNavigation()?.extras.state!['user']
    }else{
      
      this.user = new User();
    }
  }

  onSubmit(userForm: NgForm){
    if(userForm.valid){
      this.data.newUserEvent.emit({... this.user})
      console.log(this.user)

    }
    userForm.reset()
    
  }
  onClear(userForm: NgForm){
    userForm.reset();
    this.user = new User();
  }

}
