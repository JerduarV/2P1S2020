import { Injectable } from '@angular/core';
import { User } from '../Auxiliares/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  public UsuarioLogin: boolean;
  public userLogeado: User;

  constructor() { 
    this.UsuarioLogin = false;
  }

  setUsuarioLogeado(user: User):void{
    this.userLogeado = user;
    this.UsuarioLogin = true;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  Desloguear():void{
    this.userLogeado = null;
    this.UsuarioLogin = false;
    localStorage.setItem('currentUser', null);
  }

  getUserLogeado(): User{
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
