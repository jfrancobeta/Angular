import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from "./user/user.component";
import { FormUserComponent } from "./form-user/form-user.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-app',
  standalone: true,
  imports: [UserComponent, FormUserComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit {
  title: string = 'listado de usuarios'

  users: User[]=[]

  userSelected: User

  open: boolean = false;

  constructor(private service: UserService){
      this.userSelected = new User()
  }
  ngOnInit(): void {
    this.service.findAll().subscribe( users => this.users = users)
  }

  addUser(user: User){
    if(user.id > 0){
      this.users = this.users.map(u => {
        if(u.id == user.id){
          Swal.fire({
            title: "Good job!",
            text: "User Edited",
            icon: "success"
          });
          return {... user}
         
        }
        return u;
      })

    }else{
      Swal.fire({
        title: "Good job!",
        text: "User Created",
        icon: "success"
      });
      this.users = [... this.users, {... user, id: new Date().getTime()}]
    }
    this.userSelected = new User();
  }

  onDelete(id:number){
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
        this.users = this.users.filter((user) => user.id != id )
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
    
  }

  setSelectedUser(userRow: User){
    this.userSelected = {... userRow};
    this.open = true;
  }

  setOpen(){
    this.open = !this.open
  }
}
