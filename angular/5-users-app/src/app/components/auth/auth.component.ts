import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  
})
export class AuthComponent {

  user: User;

  constructor(private data: SharingDataService){
    this.user = new User()
  }

  onSubmit(){
    if(!this.user.username || !this.user.password){
      Swal.fire(
        "errror en la validacion",
        "username y password requeridos",
        "error"
      )
    }else{
      this.data.handlerLoginEvent.emit({username: this.user.username, password: this.user.password})
    }
  }
}
