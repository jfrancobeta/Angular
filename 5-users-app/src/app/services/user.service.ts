import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [{
    id: 1,
    name: 'juan', 
    lastname: 'franco',
    email: 'juan@gmail.com',
    username: 'franco',
    password: '1234'
  },{
    id: 2,
    name: 'daniela', 
    lastname: 'franco',
    email: 'daniela@gmail.com',
    username: 'daniela',
    password: '1234'
  }]
  constructor() { }

  findAll(): Observable<User[]> {
    return of(this.users);
  }
}
