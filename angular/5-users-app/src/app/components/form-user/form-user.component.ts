import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-user.component.html',

})
export class FormUserComponent implements OnInit {

  user: User;

  errrors: any = {} 

  

  constructor(private data: SharingDataService, 
    private route: ActivatedRoute,
    private service: UserService
  ){
    this.user = new User();
  }
  ngOnInit(): void {
    this.data.errorsUserForms.subscribe(error => this.errrors = error)

    this.data.selectUserEvent.subscribe(user => {
       this.user = user
     })
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if(id > 0){
        //this.service.findById(id).subscribe(user => this.user = user); // de forma de acceder directamente a la bdd
        this.data.findUserById.emit(id)
      }
    })
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
