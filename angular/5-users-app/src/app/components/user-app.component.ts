import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from "./user/user.component";
import { FormUserComponent } from "./form-user/form-user.component";
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
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
  paginator: any = {};

  
  

  constructor(private service: UserService,
    private data: SharingDataService,
    private router: Router,
    private route: ActivatedRoute
  ){
      
  }
  ngOnInit(): void {
    // this.service.findAll().subscribe( users => this.users = users)
    
    this.addUser()
    this.onDelete()
    this.findById()
    this.pageUsersEvent()
    
  }

  pageUsersEvent(){
    this.data.pageUsersEvent.subscribe(obj => {
      this.users = obj.users
      this.paginator = obj.paginator
    })
  }
  findById(){
    this.data.findUserById.subscribe(id => {
      const user = this.users.find(user => user.id == id)

      this.data.selectUserEvent.emit(user)
    })
  }

  addUser(){
    this.data.newUserEvent.subscribe(user => {
      if(user.id > 0){
        this.service.update(user).subscribe({

          next: (userUpdate) => {
          this.users = this.users.map(u => {
            if(u.id == userUpdate.id){
              
              return {... userUpdate}
              
             
            }
            
            return u;
            
          })
          Swal.fire({
            title: "Good job!",
            text: "User Updated",
            icon: "success"
          });
          this.router.navigate(['/users'],{state: {
            users: this.users,
            paginator: this.paginator

          }})
          
          
          
        },
        error: (err) => {
          this.data.errorsUserForms.emit(err.error)
        }})
  
      }else{
        this.service.create(user).subscribe({next: (userCreated) =>{

          this.users = [... this.users, {... userCreated}]
          Swal.fire({
            title: "Good job!",
            text: "User Created",
            icon: "success"
          });
          this.router.navigate(['/users'], {state: {users: this.users,paginator: this.paginator}})
        },
      error: (err) => {
        this.data.errorsUserForms.emit(err.error)
      }})
        
      }
      
     
      
      
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
          this.service.delete(id).subscribe(()=>{

            this.users = this.users.filter((user) => user.id != id )
            this.router.navigate(['/users/create'], {skipLocationChange: true}).then(() =>{
              this.router.navigate(['/users'], {state: {users: this.users}})
            })
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          });
        }
      });
    })
    
  }

 

  
}
