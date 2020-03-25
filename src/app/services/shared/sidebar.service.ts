import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any = [];

  // public menu: any = [
  //   {
  //     title: 'Principal',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       {title: 'Dashboard', url: '/dashboard'},
  //       {title: 'ProgressBar', url: '/progress'},
  //       {title: 'Graphics', url: '/graphics'},
  //       {title: 'Promises', url: '/promises'},
  //       {title: 'RXJS', url: '/rxjs'}
  //     ]
  //   },
  //   {
  //     title: 'Mantenimiento',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'Usuarios', url: '/users' },
  //       { title: 'Hospitales', url: '/hospitals' },
  //       { title: 'Médicos', url: '/doctors'},
  //     ]
  //   }
  // ];

  constructor(
    public _userService: UserService
  ) { 
    
  }

  loadMenu() {
    this.menu = this._userService.menu;
  }
}
