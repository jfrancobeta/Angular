import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html'
})
export class UserComponent {

  users!: User[]

  

  title: string = 'listado de usuarios'

  constructor(private router: Router,
    private service: UserService,
    private data: SharingDataService
  ){
    if(this.router.getCurrentNavigation()?.extras.state){

      this.users = this.router.getCurrentNavigation()?.extras.state!['users']
    }else{
      this.service.findAll().subscribe(users => this.users = users)
    }
  }

  onDelete(id:number){
    
      this.data.idEventEmiter.emit(id);

    
  }

  onSelectedUser(user: User){
    this.router.navigate(['users/edit', user.id], {state: {user}})
  }
}
