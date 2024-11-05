import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from "./user/user.component";
import { FormUserComponent } from "./form-user/form-user.component";
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'app-user-app',
  standalone: true ,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit {


  users: User[]=[]

  
  

  constructor(private service: UserService,
    private data: SharingDataService,
    private router: Router
  ){
      
  }
  ngOnInit(): void {
    this.service.findAll().subscribe( users => this.users = users)
    this.addUser()
    this.onDelete()
    
  }

  addUser(){
    this.data.newUserEvent.subscribe(user => {
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
      this.router.navigate(['/users'], {state: {users: this.users}})
      
    })
  }

  onDelete(){
    this.data.idEventEmiter.subscribe(id =>{
      
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
          this.router.navigate(['/users/create'], {skipLocationChange: true}).then(() =>{
            this.router.navigate(['/users'], {state: {users: this.users}})
          })
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    })
    
  }

 

  
}
