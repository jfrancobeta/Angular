import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEvent = new EventEmitter();

  private _idEventEmiter= new EventEmitter()

 
  private _findUserById = new EventEmitter();

  private _selectUserEvent = new EventEmitter();

  private _errorsUserForms = new EventEmitter();
  constructor() { }


  get errorsUserForms(){
    return this._errorsUserForms
  }
  get selectUserEvent(): EventEmitter<User>{
    return this._selectUserEvent
  }
  get findUserById(): EventEmitter<number>{
    return this._findUserById
  }
  get newUserEvent(): EventEmitter<User>{
    return this._newUserEvent
  }
  get idEventEmiter(): EventEmitter<number>{
    return this._idEventEmiter
  }
  
}
