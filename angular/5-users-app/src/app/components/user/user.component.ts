import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from "../paginator/paginator.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{

  users: User[] = []

  paginator: any = {}

  pageUrl : string = '/users/page'

  

  title: string = 'listado de usuarios'

  constructor(private router: Router,
    private service: UserService,
    private data: SharingDataService,
     private route: ActivatedRoute,
     private authService: AuthService
  ){
    if(this.router.getCurrentNavigation()?.extras.state){
      this.users = this.router.getCurrentNavigation()?.extras.state!['users']
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator']
    }
    
  }
  ngOnInit(): void {
    if(this.users == undefined || this.users == null || this.users.length == 0){
      //console.log('findAll')
      //this.service.findAll().subscribe(users => this.users = users)
      
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0')
  
        this.service.findAllPage(page).subscribe( pageable => {
          this.users = pageable.content as User[]
          this.paginator = pageable
          this.data.pageUsersEvent.emit({users: this.users, paginator: this.paginator})
        })
      })
    }
  }

  onDelete(id:number){
    
      this.data.idEventEmiter.emit(id);

    
  }

  onSelectedUser(user: User){
      this.router.navigate(['users/edit', user.id])
  }

  get admin(){
    return this.authService.isAdmin();
  }
}
