import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEvent = new EventEmitter();

  private _idEventEmiter= new EventEmitter()

 
  constructor() { }

  get newUserEvent(): EventEmitter<User>{
    return this._newUserEvent
  }
  get idEventEmiter(): EventEmitter<number>{
    return this._idEventEmiter
  }
  
}
